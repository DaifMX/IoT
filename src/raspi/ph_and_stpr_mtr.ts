import i2c from 'i2c-bus'
import {Gpio} from 'pigpio';
// ------------------ pH Sensor Setup ------------------

const I2C_ADDRESS = 0x48;
const CONFIG_REG = 0x01;
const CONVERT_REG = 0x00;

// ADS1115 configuration (PGA=±4.096V, single-shot mode on AIN0)
const config = 0xC283; // Binary: 1100 0010 1000 0011

// Open the I2C bus
const i2cBus = i2c.openSync(1);

// Calibration constants (replace with actual calibration values)
const V6_5 = 1.950; // Voltage at pH 6.5
const V2_9 = 2.150; // Voltage at pH 2.9
const slope = (V6_5 - V2_9) / (6.5 - 2.9);
const offset = V6_5 - slope * 6.5;

// Function to read voltage from ADS1115
function readAds1115() {
  return new Promise((resolve, reject) => {
    const configBuffer = Buffer.from([(config >> 8) & 0xFF, config & 0xFF]);

    // Write configuration to CONFIG_REG
    i2cBus.writeI2cBlock(I2C_ADDRESS, CONFIG_REG, 2, configBuffer, (err) => {
      if (err) return reject(err);

      // Wait for conversion to complete
      setTimeout(() => {
        const dataBuffer = Buffer.alloc(2);

        // Read data from CONVERT_REG
        i2cBus.readI2cBlock(I2C_ADDRESS, CONVERT_REG, 2, dataBuffer, (err) => {
          if (err) return reject(err);

          let rawAdc = dataBuffer.readInt16BE(0);

          // Convert raw ADC value to voltage
          const voltage = rawAdc * (4.096 / 32768.0); // For PGA ±4.096V

          resolve(voltage);
        });
      }, 100); // 100 ms delay for conversion
    });
  });
}

// Function to convert voltage to pH value
function convertToPh(voltage: number) {
  const phValue = (voltage - offset) / slope;
  cleanup();

  return phValue;
}

// ------------------ Stepper Motor Setup ------------------

const IN1 = new Gpio(17, { mode: Gpio.OUTPUT });
const IN2 = new Gpio(18, { mode: Gpio.OUTPUT });
const IN3 = new Gpio(27, { mode: Gpio.OUTPUT });
const IN4 = new Gpio(22, { mode: Gpio.OUTPUT });

// Define the step sequence for the 28BYJ-48 motor
const stepSequence = [
  [1, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 1],
  [0, 0, 0, 1],
  [1, 0, 0, 1],
];

// Function to rotate the motor
export function rotateMotor(steps = 4096, delay = 2) {
  return new Promise<void>((resolve) => {
    let stepCount = 0;

    function step() {
      if (stepCount >= steps) {
        // Turn off all coils
        IN1.digitalWrite(0);
        IN2.digitalWrite(0);
        IN3.digitalWrite(0);
        IN4.digitalWrite(0);
        console.log('Motor rotation completed.');
        return resolve();
      }

      const seq = stepSequence[stepCount % stepSequence.length];

      IN1.digitalWrite(seq[0]);
      IN2.digitalWrite(seq[1]);
      IN3.digitalWrite(seq[2]);
      IN4.digitalWrite(seq[3]);

      stepCount++;
      setTimeout(step, delay);
    }

    step();
  });
}


export async function getPh() {
  // Read pH value periodically
    try {
      const voltage = await readAds1115() as number;
      const phValue = convertToPh(voltage);
      console.log(`Voltage: ${voltage.toFixed(3)} V, pH: ${phValue.toFixed(2)}`);
      return phValue;

    } catch (error) {
      console.error('Error reading pH sensor:', error);
      return null;
    }
}

// Cleanup GPIO and I2C resources
function cleanup() {
  IN1.digitalWrite(0);
  IN2.digitalWrite(0);
  IN3.digitalWrite(0);
  IN4.digitalWrite(0);

  i2cBus.closeSync();
  console.log('GPIO and I2C resources released.');
}

const Gpio = require('pigpio').Gpio;

const led = new Gpio(14, { mode: Gpio.OUTPUT });

// Turn on LED
led.digitalWrite(1); // HIGH
console.log('LED is ON.');

// Cleanup
process.on('SIGINT', () => {
  led.digitalWrite(0); // LOW
  console.log('LED is OFF. Exiting...');
  process.exit();
});

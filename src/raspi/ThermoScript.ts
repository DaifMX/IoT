import ds18b20 from "ds18b20";

export default async function getTemperature() {
    return new Promise<number>((resolve, reject) => {
        ds18b20.sensors((err, ids) => {
            if (err) {
                console.error('Error detecting DS18B20:', err);
                reject(err); // Rechazamos la promesa si hay un error
                return;
            }

            console.log('Detected sensor IDs:', ids);
            const sensorId = ids[0];
            ds18b20.temperature(sensorId, (err, temperature) => {
                if (err) {
                    console.error('Error reading temperature:', err);
                    reject(err); // Rechazamos la promesa si hay un error en la lectura
                    return;
                }

                console.log(`Temperature: ${temperature}°C`);
                resolve(temperature); // Resolvemos la promesa con el valor de la temperatura
            });
        });
    });
}
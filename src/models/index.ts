'use strict';
import {Sequelize} from 'sequelize-typescript';

import path from "path";
import fs from "fs";

import DATABASE_CONFIG from '../config/database_config';

//=========================================================================================================
const db: any = {};

// Instancia de Sequelize para PostgreSQL
// const mariaSequelize = new Sequelize({
//   database: DATABASE_CONFIG.production.database, 
//   username: DATABASE_CONFIG.production.username, 
//   password: DATABASE_CONFIG.production.password,
//   host: DATABASE_CONFIG.production.host,
//   port: DATABASE_CONFIG.production.port,
//   dialect: 'mariadb'
// });

// Instancia de Sequelize para PostgreSQL
const postgresSequelize = new Sequelize({
  database: DATABASE_CONFIG.development.database, 
  username: DATABASE_CONFIG.development.username, 
  password: DATABASE_CONFIG.development.password,
  host: DATABASE_CONFIG.development.host,
  port: DATABASE_CONFIG.development.port,
  dialect: 'postgres',
});

const models: any = [];

// Leer todos los directorios encontrados dentro de una carpeta.
const readFromDir = (dir: string) => {
  fs.readdirSync(dir).forEach(file => { // Obtiene todos los archivos.
    const fullPath = path.join(dir, file);
    if(fs.statSync(fullPath).isDirectory()){ // Si el path del archivo es un carpeta.
      readFromDir(fullPath); // Vuelve a empezar el proceso pero esta vez llamando al directorio de la carpeta.
    
    // Revisa que sea un archivo typescript y que no sea el index.ts (este archivo).
    } else if ((file.endsWith('.ts') && file !== 'index.ts') || (file.endsWith('.js') && file !== 'index.js')) {
      const model = require(fullPath).default;
      models.push(model); // Incluye el model en el array. 
    }
  });
};

// Cargar modelos de manera dinámica desde el directorio de modelos.
const sequelizePushModels = (sequelizeInstance: Sequelize) => {
  models.length = 0; // Vacía el array para no agregar los archivos de la interación pasada a la instancia de Sequelize incorrecta.

  readFromDir(`${__dirname}`); //Modificamos el directorio para espeficiarle a la que carptea de que dialect debe de ingresar.
  sequelizeInstance.addModels(models); // Pasa a Sequelize el array con los directorios de los modelos a la instancia.

  const finalInstanceName = 'PostgresSequelize';
  db[finalInstanceName] = sequelizeInstance; //Ejemplo: PostgresSequelize
};

sequelizePushModels(postgresSequelize);

export default db;
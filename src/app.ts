import './helpers/common_type_imports';

import cookieParser from 'cookie-parser';
import express from 'express';
// import mqtt from 'mqtt';
import path from 'path';

import { setupHandlebars } from './config/hbs_config';

import db from './models';
import AuthRouter from './routers/AuthRouter';
import UserRouter from './routers/UserRouter';
import ViewsRouter from './routers/ViewsRouter';
import WtrTankRouter from './routers/WtrTankRouter';
import WtrTankMetaRouter from './routers/WtrTankMetaRouter';

const app = express();
const PORT = process.env.EXPRESS_PORT;

// Motor de plantillas
setupHandlebars(app);

// Express extra
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routers
app.use('/api/auth', new AuthRouter().getRouter());
app.use('/api/user', new UserRouter().getRouter());
app.use('/api/tank', new WtrTankRouter().getRouter());
app.use('/api/tank/meta', new WtrTankMetaRouter().getRouter());
app.use('/', new ViewsRouter().getRouter());

// Inciar servidor de express
const database = 'MariaSequelize';
// const database = 'PostgresSequelize';

db[database].sync({alter: true, force: false}).then(()=> {
    app.listen(PORT, () => {
        console.log(`Aplicación iniciada correctamente en el puerto ${PORT}`);
    });
});
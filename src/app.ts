import './helpers/common_type_imports';

import express from 'express';
import {engine} from 'express-handlebars';
import path from 'path';
// import mqtt from 'mqtt';

import db from './models';

import UserRouter from './routers/UserRouter';
import ViewsRouter from './routers/ViewsRouter';
import WtrTankRouter from './routers/WtrTankRouter';
import WtrTankMetaRouter from './routers/WtrTankMetaRouter';

const app = express();
const PORT = 8080;

// Motor de plantillas
app.engine('handlebars', engine());
app.set('views', `${__dirname}\\views`);
app.set('view engine', 'handlebars');

// Express extra
app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routers
app.use('/api/user', new UserRouter().getRouter());
app.use('/api/tank', new WtrTankRouter().getRouter());
app.use('/api/tank/meta', new WtrTankMetaRouter().getRouter());
app.use('/', new ViewsRouter().getRouter());

// Inciar servidor de express
db.PostgresSequelize.sync({alter: false, force: false}).then(()=> {
    app.listen(PORT, () => {
        console.log(`Aplicación iniciada correctamente en el puerto ${PORT}`);
    });
});
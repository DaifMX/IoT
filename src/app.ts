import express from 'express';
import {engine} from 'express-handlebars';

import db from './models';

import UserRouter from './routers/UserRouter';
import ViewsRouter from './routers/ViewsRouter';
import WtrTankRouter from './routers/WtrTankRouter';

const app = express();
const PORT = 8080;

// Motor de plantillas
app.engine('handlebars', engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Express extra
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routers
app.use('/api/user', UserRouter);
app.use('/api/tank', WtrTankRouter);
app.use('/', ViewsRouter);

// Inciar servidor de express
db.MariaSequelize.sync({alter: true, force: false}).then(()=> {
    app.listen(PORT, () => {
        console.log(`Aplicación iniciada correctamente en el puerto ${PORT}`);
    });
});
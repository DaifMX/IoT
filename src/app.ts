import express from 'express';
import {engine} from 'express-handlebars';

import UserRouter from './routers/UserRouter';

const app = express();
const PORT = 8080;

// Motor de plantillas
app.engine('handlebars', engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routers
app.use('/api/user', UserRouter);

// Inciar servidor de express
app.listen(PORT, () =>{
    console.log(`App iniciada en puerto ${PORT}`);
});
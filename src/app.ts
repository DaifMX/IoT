import './helpers/common_type_imports';

import fs from 'fs';
import {spawn} from 'child_process';

import cookieParser from 'cookie-parser';
import express from 'express';
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

// Carpeta para los archivos HLS
const hlsDir = path.join(__dirname, 'hls');
if (!fs.existsSync(hlsDir)) {
    fs.mkdirSync(hlsDir);
}

// Ruta estática para servir archivos HLS
app.use('/hls', express.static(hlsDir));


app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Iniciar el flujo HLS con FFmpeg
function startFFmpeg() {
  const ffmpeg = spawn('ffmpeg', [
    '-re',
    '-f', 'v4l2',
    '-i', '/dev/video0',  // Usa el nombre exacto del dispositivo
    '-c:v', 'libx264',
    '-vf', 'format=yuv420p',
    '-preset', 'ultrafast',
    '-crf', '23',
    '-g', '23',
    '-hls_time', '0.5',
    '-tune', 'zerolatency',
    '-hls_list_size', '4',
    '-hls_flags', 'delete_segments+append_list',
    '-hls_segment_type', 'fmp4',
    '-f', 'hls',
    path.join(hlsDir, 'stream.m3u8') // Esto generará un archivo m3u8 para HLS
  ])

  ffmpeg.stderr.on('data', (data: any) => {
    console.error('FFmpeg error:', data.toString());
  });

  ffmpeg.on('close', (code: any) => {
    if (code !== 0) {
      console.error(`FFmpeg finalizado con código ${code}`);
    } else {
      console.log('HLS generado correctamente.');
    }
  });
}

// Iniciar la captura de video
startFFmpeg();

// Routers
app.use('/api/auth', new AuthRouter().getRouter());
app.use('/api/user', new UserRouter().getRouter());
app.use('/api/tank', new WtrTankRouter().getRouter());
app.use('/api/tank/meta', new WtrTankMetaRouter().getRouter());
app.use('/', new ViewsRouter().getRouter());

// Inciar servidor de express
const database = 'MariaSequelize';
// const database = 'PostgresSequelize';

db[database].sync({alter: false, force: false}).then(()=> {
    app.listen(PORT, () => {
        console.log(`Aplicación iniciada correctamente en el puerto ${PORT}`);
    });
});
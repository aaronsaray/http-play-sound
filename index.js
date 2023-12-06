import 'dotenv/config';
import express from 'express';
import ListAction from './lib/list.js';
import { PlayMiddleware, PlayAction } from './lib/play.js';
import UploadAction from './lib/upload.js';

const app = express();
app.use(express.json());
app.set('json spaces', 2);

app.get('/list', ListAction);
app.post('/play/:sound', PlayMiddleware, PlayAction);
app.post('/upload', UploadAction);

app.listen(process.env.HTTP_PLAY_SOUND_PORT || 30080);

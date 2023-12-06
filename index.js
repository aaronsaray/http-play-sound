import { resolve } from 'path';
import { readdirSync, existsSync } from 'fs';
import 'dotenv/config';
import express from 'express';
import { param, validationResult } from 'express-validator';
import PlaySound from 'play-sound';

const app = express();
app.use(express.json());
app.set('json spaces', 2);

const playSoundValidator = [
  param('sound').notEmpty(),
  param('sound').custom((value) => {
    const file = resolve(`uploads/${value}.mp3`);
    if (!existsSync(file)) {
      throw new Error(`${value} does not exist to play`);
    }
    return true;
  }),
  param('sound').escape(),
];

app.get('/list', (req, res) => {
  const uploadsPath = resolve('uploads/');
  try {
    const files = readdirSync(uploadsPath);

    const results = files.map(
      (f) => `${req.protocol}://${req.get('host')}/play/${f}`,
    );

    return res.json(results);
  } catch (e) {
    let error = e.message;
    if (e.code === 'ENOENT' && e.syscall === 'scandir') {
      error = 'Have you ran "npm run init" yet?';
    }

    return res.status(500).json({ error });
  }
});

app.post('/play/:sound', playSoundValidator, (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const player = PlaySound();
    const file = resolve(`uploads/${req.params.sound}.mp3`);
    player.play(file);
    return res.status(204).send();
  }

  return res.status(422).json({ errors: errors.array() });
});

app.listen(process.env.HTTP_PLAY_SOUND_PORT || 30080);

import { resolve } from 'path';
import { param, validationResult } from 'express-validator';
import { existsSync } from 'fs';
import PlaySound from 'play-sound';

export const PlayMiddleware = [
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

export function PlayAction(req, res) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const player = PlaySound();
    const file = resolve(`uploads/${req.params.sound}.mp3`);
    player.play(file);
    return res.status(204).send();
  }

  return res.status(422).json({ errors: errors.array() });
}

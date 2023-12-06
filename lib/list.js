import { resolve } from 'path';
import { readdirSync } from 'fs';

export default (req, res) => {
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
};

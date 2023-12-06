import Multer from 'multer';
import { resolve } from 'path';
import { existsSync } from 'fs';

const upload = Multer({
  storage: Multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const existing = resolve(`uploads/${file.originalname}`);
    if (existsSync(existing)) {
      return cb(new Error(`This file already exists: ${existing}`));
    }

    return cb(null, true);
  },
});

export default (req, res) => {
  upload.single('mp3')(req, res, (err) => {
    if (err) {
      return res.status(422).json({ errors: [err.message] });
    }

    return res.status(201).send();
  });
};

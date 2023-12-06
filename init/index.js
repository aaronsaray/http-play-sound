import { cpSync } from 'fs';
import { resolve } from 'path';

process.stdout.write('Copying files...');

cpSync(resolve('init/sounds/chime.mp3'), resolve('uploads/chime.mp3'));
cpSync(resolve('init/sounds/emergency.mp3'), resolve('uploads/emergency.mp3'));

process.stdout.write('Done!\n\n');

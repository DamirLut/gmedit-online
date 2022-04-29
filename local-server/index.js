///@ts-nocheck
import fs from 'fs';
import readYY from '../tools/readYY.js';
import Server from './Server.js';

export default function init(path) {
  const dir = fs.readdirSync(path);
  dir.forEach((file) => {
    if (file.endsWith('.yyp')) {
      const project = readYY(path + '/' + file);
      new Server(project);
      console.log('Start local server!');
    }
  });
}

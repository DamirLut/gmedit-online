///@ts-nocheck
import fs from '../tools/fsWrapper.js';
import readYY from '../tools/readYY.js';
import Server from './Server.js';

export default function init(path, settings) {
  const dir = fs().readdirSync(path);
  dir.forEach((file) => {
    if (file.endsWith('.yyp')) {
      const project = readYY(path + '/' + file);
      console.log('Start local server!');
      new Server(project, settings);
    }
  });
}

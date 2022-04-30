///@ts-nocheck
import fs from './fsWrapper.js';

export default function (path) {
  var data = fs().readFileSync(path, { encoding: 'utf-8' });
  eval('data = ' + data);
  return data;
}

import fs from 'fs';

export default function (path) {
  var data = fs.readFileSync(path, { encoding: 'utf-8' });
  eval('data = ' + data);
  return data;
}

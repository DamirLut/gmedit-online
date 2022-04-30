// @ts-nocheck

import isNodeJS from './tools/isNodeJs.js';
console.log('Plugin load from', isNodeJS ? 'NodeJS' : 'Browser');

import Plugin from './gmedit/index.js';
import readJson from './tools/readJson.js';

function LoadPlugin() {
  GMEdit.register('gmedit-online', {
    init: (state) => {
      Plugin(state);
    },
  });
}

var args = [];

if (isNodeJS) {
  process.argv.splice(0, 2);
  args = process.argv;
}
if (args.includes('--server')) {
  if (!args.includes('--project')) throw console.error('--project arg undefined');
  const path = args[args.indexOf('--project') + 1];

  const startServer = async () => {
    const { default: server } = await import('./local-server/index.js');
    const settings = readJson('./settings.json');
    server(path, settings);
  };

  startServer();
} else {
  LoadPlugin();
}

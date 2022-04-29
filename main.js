// @ts-nocheck

const isNodejs = typeof process !== 'undefined';
console.log('Plugin load from', isNodejs ? 'NodeJS' : 'Browser');

import Plugin from './gmedit/index.js';

function LoadPlugin() {
  GMEdit.register('gmedit-online', {
    init: (state) => {
      Plugin(state);
    },
  });
}

var args = [];

if (isNodejs) {
  process.argv.splice(0, 2);
  args = process.argv;
}
if (args.includes('--server')) {
  if (!args.includes('--project')) throw console.error('--project arg undefined');
  const path = args[args.indexOf('--project') + 1];
  import('./local-server/index.js').then(({ default: server }) => server(path));
} else {
  LoadPlugin();
}

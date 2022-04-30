///@ts-nocheck
var fs = undefined;

if (typeof Electron_FS != 'undefined') {
  fs = Electron_FS;
  console.log('Using Electron_FS');
} else {
  import('fs').then((data) => {
    fs = data;
    console.log('Using NodeJS fs');
  });
}

export default function FsWrapper() {
  return fs;
}

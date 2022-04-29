///@ts-nocheck

const isNodejs = typeof process !== 'undefined';

function init(gmeditState) {
  const MenuListItems = [
    new Electron_MenuItem({
      id: 'gmeditonline-sep',
      type: 'separator',
    }),

    new Electron_MenuItem({
      id: 'gmeditonline-join-server',
      label: 'Join Live Session',
      enabled: false,
      click: (event) => {
        console.log(event);
      },
    }),
  ];
  if (isNodejs) {
    MenuListItems.push(
      new Electron_MenuItem({
        id: 'gmeditonline-start-server',
        label: 'Start Live Session',
        enabled: false,
        click: (event) => {
          const server = require(gmeditState.dir + '/local-server');
          server($gmedit['gml.Project'].current.dir);
          for (let item of MenuListItems) {
            item.enabled = false;
          }
        },
      }),
    );
  }

  let MainMenu = $gmedit['ui.MainMenu'].menu;
  for (let [index, mainMenuItem] of MainMenu.items.entries()) {
    if (mainMenuItem.id != 'close-project') continue;
    for (let newItem of MenuListItems) {
      MainMenu.insert(++index, newItem);
    }
    break;
  }

  GMEdit.on('projectClose', () => {
    for (let item of MenuListItems) {
      item.enabled = false;
    }
  });

  console.log('GMEdit-online inited');

  console.log($gmedit);
}

export default init;

///@ts-nocheck

import fs from '../tools/fsWrapper.js';
import readJson from '../tools/readJson.js';
import isNodeJS from '../tools/isNodeJs.js';
import { AddMenuButton, SetEnableMenuButton } from './api.js';

function init(gmeditState) {
  const MenuListItems = [
    {
      id: 'gmeditonline-sep',
      type: 'separator',
    },
    {
      id: 'gmeditonline-join-server',
      label: 'Join Live Session',
      enabled: true,
      click: (event) => {
        console.log(event);
      },
    },
  ];
  if (isNodeJS) {
    MenuListItems.push({
      id: 'gmeditonline-start-server',
      label: 'Start Live Session',
      enabled: false,
      click: async (event) => {
        const { default: server } = await import(gmeditState.dir + '/local-server/index.js');
        const settings = readJson(gmeditState.dir + '/settings.json');
        server($gmedit['gml.Project'].current.dir, settings);
        for (let item of MenuListItems) {
          SetEnableMenuButton(item.id, false);
        }
      },
    });
  }
  AddMenuButton(MenuListItems);

  GMEdit.on('projectClose', () => {
    for (let item of MenuListItems) {
      SetEnableMenuButton(item.id, false);
    }
  });
  GMEdit.on('projectOpen', () => {
    for (let item of MenuListItems) {
      SetEnableMenuButton(item.id, true);
    }
  });

  console.log('GMEdit-online inited');

  console.log($gmedit);
}

export default init;

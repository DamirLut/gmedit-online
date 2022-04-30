///@ts-nocheck

import fs from '../tools/fsWrapper.js';
import readJson from '../tools/readJson.js';
import isNodeJS from '../tools/isNodeJs.js';
import { AddMenuButton, SetEnableMenuButton } from './api.js';
import Client from './Client.js';

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
        const div = document.createElement('div');

        div.className = 'promtRoom';
        div.innerHTML = /*html*/ `
        <h1>Enter Room ID</h1>
        <div>
          <input placeholder='room-id' />
          <button >Join</button>
        </div>
        `;
        div.children[1].children[1].onclick = () => {
          const masterServer = 'ws://192.168.0.2:12345';
          const roomId = div.children[1].children[0].value;
          console.log(roomId);
          window.client = new Client(masterServer + '/' + roomId);
          div.remove();
        };
        document.body.appendChild(div);
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
        window.server = server($gmedit['gml.Project'].current.dir, settings);
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
    window.server?.close();
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

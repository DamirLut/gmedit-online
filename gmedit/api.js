///@ts-nocheck
import isNodeJS from '../tools/isNodeJs.js';

export function SetEnableMenuButton(id, state) {
  if (isNodeJS) {
    let MainMenu = $gmedit['ui.MainMenu'].menu;
    for (let [index, mainMenuItem] of MainMenu.items.entries()) {
      if (mainMenuItem.id == id) {
        mainMenuItem.enabled = state;
      }
    }
  } else {
    document.getElementById(id).disabled = !state;
  }
}

export function AddMenuButton(MenuListItems) {
  if (isNodeJS) {
    let MainMenu = $gmedit['ui.MainMenu'].menu;
    for (let [index, mainMenuItem] of MainMenu.items.entries()) {
      if (mainMenuItem.id != 'close-project') continue;
      for (let newItem of MenuListItems) {
        MainMenu.insert(++index, new Electron_MenuItem(newItem));
      }
      break;
    }
  } else {
    document.querySelector('.preferences').addEventListener('click', () => {
      const menu = document.querySelector('.popout-menu');
      for (let i = 0; i < menu.children.length; i++) {
        if (menu.children[i].id) continue;
        if (menu.children[i].classList.contains('popout-menu-separator')) {
          console.log(menu.children[i]);
          for (let newItem of MenuListItems) {
            const li = document.createElement('li');
            li.id = newItem.id;
            if (newItem.type != 'separator') {
              li.className = 'popout-menu-normal';
              li.innerHTML = `<span>${newItem.label}</span>`;

              li.onclick = newItem.click;
            } else {
              li.className = 'popout-menu-separator';
            }
            menu.children[i].after(li);
          }
        }
      }
    });
  }
}

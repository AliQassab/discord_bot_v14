import { readdirSync } from "fs";

import fs from "fs";
import path from "path";
export default async function handleComponents(client) {
  const componentFolders = readdirSync(`./src/components/`);
  for (const folder of componentFolders) {
    const componentFile = readdirSync(`./src/components/${folder}`).filter(
      (file) => file.endsWith(".js")
    );
    const { buttons, select } = client;
   
    for (const file of componentFile) {
      if (file === "sub-menu.js" || file === "sub-FAC.js") {
        const menuModule = await import(`../../components/${folder}/${file}`);
        const menu = menuModule.default;

        if (menu && menu.data && menu.data.name) {
          if (file === "sub-menu.js") {
            select.set(menu.data.name, menu);
          } else if (file === "sub-FAC.js") {
            buttons.set(menu.data.name, menu);
          }
        } else {
          console.error(`Error: Invalid command module in file ${file}`);
        }
      }
    }

   
  }
}

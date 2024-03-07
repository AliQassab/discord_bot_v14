import fs from "fs";

export default async function handleEvents(client) {
  const eventFolders = fs.readdirSync("./src/events");
  for (const folder of eventFolders) {
    const eventFiles = fs
      .readdirSync(`./src/events/${folder}`)
      .filter((file) => file.endsWith(".js"));
     
    switch (folder) {
      case "client":
        for (const file of eventFiles) {
          const event = await import(`../../events/client/${file}`);
          
          if (event.default.once) {
            client.once(event.default.name, (...args) =>
              event.default.execute(...args, client)
            );
          } else {
            client.on(event.default.name, (...args) =>
              event.default.execute(...args, client)
            );
          }
        }
        break;
      default:
        break;
    }
  }
}

import CommandStatus from "./src/utils/CommandStatus";
import { ExtendedClient } from "./src/structures/Client"
import ApiUtil from "./src/utils/ApiUtil";
require('dotenv').config()

ApiUtil.checkHealth().then((healthy) => {
   if (!healthy) {
       console.log("API is not healthy, shutting down")
       process.exit(1)
   }
});

try {
    CommandStatus.loadDisabledCommands()
} catch (e) {
    console.error(e)
}
export const client: ExtendedClient = new ExtendedClient()
client.start()
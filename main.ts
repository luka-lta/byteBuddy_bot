import CommandStatus from "./src/utils/CommandStatus";
import { ExtendedClient } from "./src/structures/Client"
require('dotenv').config()
// import Database from "./src/utils/Database";
//
// Database.connect()
try {
    CommandStatus.loadDisabledCommands()
} catch (e) {
    console.error(e)
}
export const client: ExtendedClient = new ExtendedClient()
client.start()
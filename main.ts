import CommandStatus from "./src/utils/CommandStatus";
import { ExtendedClient } from "./src/structures/Client"
require('dotenv').config()
// import Database from "./src/utils/Database";
//
// Database.connect()
CommandStatus.loadDisabledCommands()
export const client: ExtendedClient = new ExtendedClient()
client.start()
import { ApiController } from "../Server/Controllers/DataBaseApiController";
import { DataBaseStorage } from "../Server/Storage/DataBaseStorage";
import { ExpressWrapper } from "../Server/ExpressWrapper/ExpressWrapper";
import fs from "fs";
import path from "path";
import { Client } from "pg";


export function runServer(): void {
    const connectionString = fs.readFileSync(path.join(__dirname, "DataBaseUrl.txt"), "utf8");
    const dataBaseClient = new Client({ connectionString: connectionString });
    dataBaseClient.connect();

    const dataBaseStorage = new DataBaseStorage(dataBaseClient);
    const dataBaseController = new ApiController(dataBaseStorage);
    const server = new ExpressWrapper(Number(process.env.PORT) || 5000, dataBaseController);
    server.start();
}

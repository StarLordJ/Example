import express, { Express } from "express";
import { DataBaseStorage, DataBaseA } from "../Storage/DataBaseStorage";
import { httpGet, httpPost } from "../ExpressWrapper/Helpers/requestDecorators";
import { httpType, httpBodyParam, httpQueryUrlParam } from "../ExpressWrapper/Helpers/Params";
import { httpReturn } from "../ExpressWrapper/Helpers/Results";
import path from "path";

export class ApiController {
    private storage: DataBaseStorage;

    public constructor(storage: DataBaseStorage) {
        this.storage = storage;
    }

    public async setupMiddleware(expressApplication: Express): Promise<void> {
        const pat = __dirname.split("Backend")[0];
        expressApplication.use(express.static(path.join(pat, "Frontend/distr")));
    }

    @httpGet("/searchAllTableA", httpReturn.Json)
    public async getDataFromBase(): Promise<DataBaseA[]> {
        return await this.storage.getDataFromBase("TableA");
    }

    @httpPost("/updateTableA", httpReturn.Json, httpBodyParam("updatedFields", httpType.Object), httpBodyParam("isEditedItem", httpType.Boolean))
    public async updateData(updatedFields: Record<string, any>, isEditedItem: boolean): Promise<void | number> {
        return await this.storage.updateData("TableA", isEditedItem, updatedFields);
    }

    @httpPost("/deleteItemTableA", httpReturn.Void, httpBodyParam("id", httpType.Number))
    public async deleteItem(id: number): Promise<void> {
        return await this.storage.deleteItem("TableA", id);
    }
}

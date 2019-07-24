import { Client, QueryResult } from "pg";

export interface DataBaseA {
    "field_1": string;
    "field_2": string;
    "field_3": string;
    "field_4": string;
    "field_5": string;
    "field_6": string;
    "field_7": Date;
    "field_8": string;
    "field_9": string;
    "field_10": string;
    id: number;
}

export class DataBaseStorage {
    private client: Client;

    public constructor(client: Client) {
        this.client = client;
    }

    public async getDataFromBase(table: string): Promise<DataBaseA[]> {
        const queryString = `SELECT * FROM "public"."${table}"`;
        const response: QueryResult = await this.client.query(queryString);
        return response.rows.sort((a, b): number => a.id - b.id);
    }

    public async updateData(table: string, isEditedItem: boolean, item: Record<string, string | Date | number>): Promise<void | number> {
        if (isEditedItem) {
            let queryString = `UPDATE "public"."${table}" SET`;
            const filtered = Object.keys(item).filter((el: string): boolean => el !== "id");

            filtered.forEach((field: string, index: number): void => {
                queryString += ` ${field} = '${item[field]}'${index + 1 === filtered.length ? "" : ","} `
            })

            queryString += `WHERE id='${item.id}'`;

            await this.client.query(queryString)
        } else {
            const fields = Object.keys(item);
            const values = fields.map((field: string): string => `'${item[field]}'`);

            const queryString = `INSERT INTO "public"."${table}" (${fields.join(", ")}) VALUES (${values.join(", ")})`;
            await this.client.query(queryString)
            const response = await this.client.query(`SELECT MAX(id) FROM "public"."${table}"`);

            return response.rows[0]

        }
    }

    public async deleteItem(table: string, id: number): Promise<void> {
        const queryString = `DELETE FROM "public"."${table}" WHERE id='${id}'`;

        await this.client.query(queryString);
    }
}

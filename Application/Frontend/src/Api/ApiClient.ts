import { DataBaseA } from "components/Types";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface QueryParams {
    [key: string]: string;
}

interface QueryOptions {
    params?: QueryParams;
    config?: AxiosRequestConfig;
}

export class ApiClient {
    public getDataBaseData = async (table: string): Promise<DataBaseA[]> => {
        return await this.get<DataBaseA[]>(`/searchAll${table}`);
    };

    public updateDataBaseA = async (table: string, updatedFields: Partial<DataBaseA>, isEditedItem: boolean): Promise<void | AxiosResponse> => {
        return await this.post(`/update${table}`, { updatedFields, isEditedItem });
    };

    public deleteItem = async (table: string, id: number): Promise<void> => {
        await this.post(`/deleteItem${table}`, { id })
    }

    private async get<T>(url: string, options: QueryOptions = {}): Promise<T> {
        try {
            const response = await axios.get(this.buildQueryString(url, options.params), options.config);
            return response.data;
        } catch (e) {
            throw Error(e);
        }
    };

    private async post(url: string, data?: any): Promise<any> {
        try {
            return await axios.post(url, data);
        } catch (e) {
            throw Error(e);
        }
    }

    private buildQueryString(url: string, params?: QueryParams) {
        let queryString = url;

        if (params) {
            queryString += "?";

            for (const [name, value] of Object.entries(params)) {
                const pair = name + "=" + encodeURIComponent(value) + "&";
                queryString += pair;
            }
        }

        return queryString;
    }
}

export default new ApiClient();

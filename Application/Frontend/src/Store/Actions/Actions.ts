import { DataBaseActions } from "./database";
import { EditActions } from "./edit";

export type Actions = DataBaseActions & EditActions;

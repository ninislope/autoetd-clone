import { StateLevel } from "./StateLevel";

export interface StateBase extends StateLevel {
    readonly levels: StateLevel[];
}

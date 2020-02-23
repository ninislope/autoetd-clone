import { StateLevel } from "./StateLevel";
import { PersonClass } from "../PersonClass";

export interface StateBase extends StateLevel {
    /** レベル(1始まり) */
    readonly levels: StateLevel[];
    /** 自動付与 */
    readonly autoLevel?: (person: PersonClass) => number;
}

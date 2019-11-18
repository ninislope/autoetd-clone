import { StateType } from "./StateType";
import { StateBase } from "./StateBase";

export interface State extends StateBase {
    readonly type: StateType;
}

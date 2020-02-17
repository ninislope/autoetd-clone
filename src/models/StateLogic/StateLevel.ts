import { StateId } from "./StateId";
import { HasEffect } from "./HasEffect";

export interface StateLevel extends HasEffect<StateId> {
    readonly levelName?: boolean;
    readonly hidden?: true;
}

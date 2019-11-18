import { StateEffects } from "./StateEffects";

export interface StateLevel {
    readonly name?: string;
    readonly levelName?: boolean;
    readonly description?: string;
    readonly hidden?: true;
    readonly effects?: StateEffects;
}

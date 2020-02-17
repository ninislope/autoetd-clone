import { StateEffects } from "./StateEffects";

export interface HasEffect<Id> {
    readonly name?: string;
    readonly description?: string;
    readonly effects?: StateEffects;
    readonly before?: Id[];
    readonly after?: Id[];
}

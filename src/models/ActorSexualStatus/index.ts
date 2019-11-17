import { Behavior } from "./Behavior";
import { Common } from "./Common";
import { Resistance } from "./Resistance";
import { Sensitivity } from "./Sensitivity";
import { Size } from "./Size";

export interface ActorSexualStatus {
    readonly behavior: Behavior;
    readonly common: Common;
    readonly resistance: Resistance;
    readonly sensitivity: Sensitivity;
    readonly size: Size;
}

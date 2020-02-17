import { StateEffects } from "./StateEffects";
import { Owned } from "./Owned";

// TODO
export interface OwnedEffects extends StateEffects {
    owned?: (owned: Owned) => string[];
    curseBreak?: (owned: Owned) => string[];
    released?: (owned: Owned) => string[];
}

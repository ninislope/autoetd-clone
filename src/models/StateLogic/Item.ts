import { HasEffect } from "./HasEffect";
import { ItemId } from "./ItemId";
import { OwnedEffects } from "./OwnedEffects";

export interface Item extends HasEffect<ItemId> {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly effects?: OwnedEffects;
}

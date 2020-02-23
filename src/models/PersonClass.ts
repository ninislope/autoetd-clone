import { immerable } from "immer";
import { PersonBaseClass } from "./PersonBaseClass";
import { EffectivePersonClass } from "./EffectivePersonClass";
import { createCacheStore } from "../util/createCacheStore";
import { ActorStatesClass, ActorEquipmentsClass } from "./StateLogic";

const effectiveCache = createCacheStore<PersonClass, EffectivePersonClass>();

export class PersonClass extends PersonBaseClass {
    [immerable] = true;

    // eslint-disable-next-line class-methods-use-this
    get isEffective(): false {
        return false;
    }

    get asEffective() {
        return effectiveCache(
            this,
            () => new EffectivePersonClass(ActorEquipmentsClass.applyPassive(ActorStatesClass.applyPassive(this))),
        );
    }
}

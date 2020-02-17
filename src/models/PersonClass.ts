import { immerable } from "immer";
import { PersonBaseClass } from "./PersonBaseClass";
import { EffectivePersonClass } from "./EffectivePersonClass";
import { StateTriggerEffectName, StateTriggerEffects } from "./StateLogic";
import { ElementOf } from "../util";
import { createCacheStore } from "../util/createCacheStore";

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
            () => new EffectivePersonClass(this.equipments.applyPassive(this.states.applyPassive(this))),
        );
    }

    triggerEffect<Name extends StateTriggerEffectName>(
        name: Name,
        params: ElementOf<Parameters<NonNullable<StateTriggerEffects[Name]>>>,
    ) {
        // TODO: equipments or some
        return this.states.triggerEffect(name, params);
    }
}

import { StateEffectParameter } from "./StateEffectParameter";
import { ActorParameter } from "./ActorParameter";
import { BattleFieldClass } from "./BattleFieldClass";
import { BattleClass } from "./BattleClass";
import { StateBasicTriggerEffectName } from "../StateLogic";
import { ActorStatesClass } from "../StateLogic/ActorStatesClass";

export class StateEffectParameterClass implements StateEffectParameter {
    readonly actorParameter: ActorParameter;

    readonly lastField: BattleFieldClass;

    readonly battle?: BattleClass;

    readonly turn?: number;

    constructor(param: StateEffectParameter) {
        this.actorParameter = param.actorParameter;
        this.lastField = param.lastField;
        this.battle = param.battle;
        this.turn = param.turn;
    }

    get actor() {
        return this.lastField.actor(this.actorParameter);
    }

    autoAttach() {
        return ActorStatesClass.autoAttach(this);
    }

    triggerEffect<Name extends StateBasicTriggerEffectName>(name: Name) {
        return ActorStatesClass.triggerEffect(this as any, name);
    }
}

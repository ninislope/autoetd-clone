import { StrategyPrepareParameter } from "./StrategyPrepareParameter";
import { BattleClass } from "./BattleClass";
import { ActorParameter } from "./ActorParameter";
import { BattleFieldClass } from "./BattleFieldClass";

export class StrategyPrepareParameterClass implements StrategyPrepareParameter {
    battle: BattleClass;

    lastField: BattleFieldClass;

    actorParameter: ActorParameter;

    turn: number;

    constructor(param: StrategyPrepareParameter) {
        this.battle = param.battle;
        this.lastField = param.lastField;
        this.actorParameter = param.actorParameter;
        this.turn = param.turn;
    }

    get actor() {
        return this.lastField.actor(this.actorParameter);
    }
}

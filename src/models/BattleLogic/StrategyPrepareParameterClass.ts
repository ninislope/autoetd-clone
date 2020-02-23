import { StrategyPrepareParameter } from "./StrategyPrepareParameter";
import { BattleClass } from "./BattleClass";
import { StateEffectParameterClass } from "./StateEffectParameterClass";

export class StrategyPrepareParameterClass extends StateEffectParameterClass implements StrategyPrepareParameter {
    battle: BattleClass;

    turn: number;

    constructor(param: StrategyPrepareParameter) {
        super(param);
        this.battle = param.battle;
        this.turn = param.turn;
    }
}

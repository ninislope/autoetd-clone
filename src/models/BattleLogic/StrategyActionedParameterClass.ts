/* eslint-disable import/no-cycle */
import { StrategyAimedParameterClass } from "./StrategyAimedParameterClass";
import { StrategyActionedParameter } from "./StrategyActionedParameter";

export class StrategyActionedParameterClass extends StrategyAimedParameterClass implements StrategyActionedParameter {
    readonly hp?: number;

    readonly mp?: number;

    readonly ap?: number;

    readonly ep?: number;

    readonly rp?: number;

    constructor(param: StrategyActionedParameter) {
        super(param);
        this.hp = param.hp;
        this.mp = param.mp;
        this.ap = param.ap;
        this.ep = param.ep;
        this.rp = param.rp;
    }
}

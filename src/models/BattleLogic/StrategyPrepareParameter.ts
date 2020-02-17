import { ActorClass } from "./ActorClass";
import { StrategyPrepareBaseParameter } from "./StrategyPrepareBaseParameter";

export interface StrategyPrepareParameter extends StrategyPrepareBaseParameter {
    battler: ActorClass;
}

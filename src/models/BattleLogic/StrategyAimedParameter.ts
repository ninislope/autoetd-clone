import { ActorsClass } from "./ActorsClass";
import { StrategyAimedBaseParameter } from "./StrategyAimedBaseParameter";
import { ActorClass } from "./ActorClass";

export interface StrategyAimedParameter extends StrategyAimedBaseParameter {
    battler: ActorClass;
    targets: ActorsClass;
}

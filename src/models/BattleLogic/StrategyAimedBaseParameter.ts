import { StrategyActionId } from "./StrategyActionId";
import { StrategyPrepareBaseParameter } from "./StrategyPrepareBaseParameter";
import { ActorParameter } from "./ActorParameter";

export interface StrategyAimedBaseParameter extends StrategyPrepareBaseParameter {
    targets: ActorParameter[];
    actionId: StrategyActionId;
}

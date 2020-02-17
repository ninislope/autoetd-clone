/* eslint-disable import/no-cycle */
import { StrategyAimedParameter } from "./StrategyAimedParameter";
import { ActorVariable } from "../ActorVariable";

export interface StrategyActionedParameter extends StrategyAimedParameter, Partial<ActorVariable> {}

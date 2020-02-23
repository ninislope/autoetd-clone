/* eslint-disable import/no-cycle */
import { ActorVariable } from "../ActorVariable";
import { StrategyAimedParameter } from "./StrategyAimedParameter";

export interface StrategyActionedParameter extends StrategyAimedParameter, Partial<ActorVariable> {}

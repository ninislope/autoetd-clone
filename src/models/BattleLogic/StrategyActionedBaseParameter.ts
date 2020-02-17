/* eslint-disable import/no-cycle */
import { ActorVariable } from "../ActorVariable";
import { StrategyAimedBaseParameter } from "./StrategyAimedBaseParameter";

export interface StrategyActionedBaseParameter extends StrategyAimedBaseParameter, Partial<ActorVariable> {}

import { StateBattleEffectParameter } from "./StateBattleEffectParameter";
import { ActorVariable } from "../ActorVariable";

export interface StatePostActionEffectParameter extends StateBattleEffectParameter, Partial<ActorVariable> {}

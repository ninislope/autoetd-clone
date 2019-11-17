export interface ActorVariable {
    /** Hit Point */
    readonly hp: number;
    /** Magic Point */
    readonly mp: number;
    /** Acme(絶頂) Point */
    readonly ap: number;
    /** Estrus(発情) Point */
    readonly ep: number;
    /** Registance(抵抗) Point */
    readonly rp: number;
}

export type ActorVariableKey = keyof ActorVariable;

export const zeroActorVariable: ActorVariable = {
    hp: 0,
    mp: 0,
    ap: 0,
    ep: 0,
    rp: 0,
};

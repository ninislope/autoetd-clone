export interface Common {
    readonly maxAp: number;
    readonly maxEp: number;
}

export const zeroCommon: Common = {
    maxAp: 0,
    maxEp: 0,
};

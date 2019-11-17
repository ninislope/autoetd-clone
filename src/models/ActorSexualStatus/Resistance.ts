import { Sensitivity, zeroSenzitivity } from "./Sensitivity";

export interface Resistance extends Sensitivity {}

export const zeroResistance: Resistance = zeroSenzitivity;

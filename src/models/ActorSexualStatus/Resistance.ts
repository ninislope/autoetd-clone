import { Sensitivity, zeroSensitivity } from "./Sensitivity";

export interface Resistance extends Sensitivity {}

export const zeroResistance: Resistance = zeroSensitivity;

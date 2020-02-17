import { Sensitivity, zeroSensitivity, SensitivityKey, sensitivityKeys, sensitivityKeyT } from "./Sensitivity";

export interface Resistance extends Sensitivity {}

export const zeroResistance: Resistance = zeroSensitivity;

export type ResistanceKey = SensitivityKey;

export const resistanceKeys = sensitivityKeys;

export const resistanceKeyT = sensitivityKeyT;

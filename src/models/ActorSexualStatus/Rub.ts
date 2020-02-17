import { Sensitivity, zeroSensitivity, SensitivityKey, sensitivityKeys, sensitivityKeyT } from "./Sensitivity";

// 裸だと0で、環境（風等）、装備で上下する。摩擦判定に使う
/** 摩擦係数 */
export interface Rub extends Sensitivity {}

export const zeroRub: Rub = zeroSensitivity;

export type RubKey = SensitivityKey;

export const rubKeys = sensitivityKeys;

export const rubKeyT = sensitivityKeyT;

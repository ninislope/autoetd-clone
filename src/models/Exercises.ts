import { Sensitivity } from "./ActorSexualStatus/Sensitivity";

export interface Exercises extends Partial<Sensitivity>, Partial<ExtraExercises> {}

export type ExercisePart = keyof Exercises;

export interface ExtraExercises {
    /** 頭(extra) */
    head: number;
    /** 声(extra) */
    speak: number;
    /** 腕・上半身(extra) */
    upper: number;
    /** 胸(extra) */
    chest: number;
    /** 腹(extra) */
    abdominal: number;
    /** 腰(extra) */
    waist: number;
    /** 股間(extra) */
    crotch: number;
    /** 足・下半身(extra) */
    lower: number;
    /** 背中(extra) */
    rear: number;
    /** 魔力(extra) */
    magic: number;
}

export type ExtraExercisePart = keyof ExtraExercises;

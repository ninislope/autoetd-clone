import { PartId } from "./PartId";
import { zeroCut } from "../util";
import { ExerciseResponseParameter, ExerciseResponse } from "./ExerciseResponse";

interface ExerciseResponseFactorParams {
    readonly coefficient?: number;
    readonly threshold?: number;
    readonly baseline?: number;
}

interface ExerciseResponseFactorCalculator {
    (params: ExerciseResponseParameter): number;
}

export type ExerciseResponseFactor = ExerciseResponseFactorParams | ExerciseResponseFactorCalculator;

interface ExerciseResponseFactors {
    readonly power?: number;
    readonly threshold?: number;
    readonly sensitivity?: ExerciseResponseFactor;
    readonly rub?: ExerciseResponseFactor;
    readonly exercise?: ExerciseResponseFactor;
    readonly size?: ExerciseResponseFactor;
}

type ExerciseResponseCalculator = (params: ExerciseResponseParameter) => ExerciseResponse;

export const exerciseResponseCoefficients: {
    [PId in PartId]: ExerciseResponseFactors | ExerciseResponseCalculator;
} = {
    skin: {
        threshold: 1000,
    },
    brain: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    ear: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    mouth: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    tongue: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    throat: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    bust: {
        power: 0.001,
        threshold: 200,
        size({ size }) {
            return zeroCut(size - 13.75) ** 1.3;
        },
    },
    nipple: {
        threshold: 200,
        size: { coefficient: 0 },
        rub: { coefficient: 2 },
    },
    hand: {
        threshold: 1000,
    },
    arm: {
        threshold: 1000,
    },
    armpit: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    stomach: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    back: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    clitoris: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    urethra: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    bladder: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    labia: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    vagina: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    portio: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    womb: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    ovary: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    anus: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    intestine: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    hip: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    thigh: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0.1, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    leg: {
        sensitivity: { coefficient: 0, threshold: 0 },
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: -1 },
        rub: { coefficient: 0, threshold: 0 },
    },
    foot: ({ exercise }) => ({ ep: zeroCut(exercise - 100) * 0.1, size: 0, rub: exercise }),
};

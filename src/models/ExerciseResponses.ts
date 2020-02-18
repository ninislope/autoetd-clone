import { PartId } from "./PartId";
import { Rub } from "./ActorSexualStatus/Rub";
import { Sensitivity } from "./ActorSexualStatus/Sensitivity";
import { partIds } from "./partIds";
import { Size, isSizePart } from "./ActorSexualStatus/Size";
import { Exercises } from "./Exercises";
import { canonicalExercise } from "./canonicalExercise";

export interface ExerciseResponse {
    ep: number;
    /** 揺れ=サイズ */
    size: number;
    /** 擦れ */
    rub: number;
}

export type ExerciseResponses = {
    [Part in PartId]: ExerciseResponse;
};

interface ExerciseResponseFactorParams {
    coefficient: number;
    threshold: number;
    baseline?: number;
}

interface ExerciseResponseFactors {
    rub: ExerciseResponseFactorParams;
    exercise: ExerciseResponseFactorParams;
    size: ExerciseResponseFactorParams;
}

const zeroCut = (num: number) => (num < 0 ? 0 : num);

type ExerciseResponseCalculator = (params: {
    sensitivity: number;
    rub: number;
    exercise: number;
    size: number;
}) => ExerciseResponse;

const exerciseResponseCoefficients: { [PId in PartId]: ExerciseResponseFactors | ExerciseResponseCalculator } = {
    skin: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    brain: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    ear: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    mouth: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    tongue: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    throat: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    bust({ sensitivity, rub, exercise, size }) {
        const exerciseFactor = zeroCut(exercise - (14 - size));
        const sizeFactor = 0.25 * zeroCut(size - 13.75);
        const rubFactor = 1 + rub * 3;
        return { ep: sensitivity * exerciseFactor * (sizeFactor + rubFactor), size: sizeFactor, rub: rubFactor };
    }, // { exercise: { coefficient: 1000, threshold: 0 }, size: { coefficient: 0.25, threshold: 13.75 } },
    nipple: {
        exercise: { coefficient: 1, threshold: 1 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    hand: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    arm: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    armpit: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    stomach: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    back: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    clitoris: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    urethra: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    bladder: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    labia: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    vagina: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    portio: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    womb: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    ovary: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    anus: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    intestine: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    hip: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    thigh: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0.1, threshold: 0 },
        rub: { coefficient: 0, threshold: 0 },
    },
    leg: {
        exercise: { coefficient: 0, threshold: 0 },
        size: { coefficient: 0, threshold: -1 },
        rub: { coefficient: 0, threshold: 0 },
    },
    foot: ({ exercise }) => ({ ep: zeroCut(exercise - 100) * 0.1, size: 0, rub: exercise }),
};

function calcExerciseResponseFactor(value: number, { coefficient, threshold, baseline }: ExerciseResponseFactorParams) {
    return coefficient * zeroCut(value - threshold) + (baseline || 0);
}

export function exerciseResponse({
    part,
    sensitivity,
    exercise,
    size,
    rub = 0,
}: {
    part: PartId;
    sensitivity: number;
    exercise: number;
    size: number;
    rub?: number;
}): ExerciseResponse {
    const exerciseResponseCoefficient = exerciseResponseCoefficients[part];
    if (exerciseResponseCoefficient instanceof Function) {
        return exerciseResponseCoefficient({ sensitivity, exercise, size, rub });
    }
    const { exercise: exerciseFactor, size: sizeFactor, rub: rubFactor } = exerciseResponseCoefficient;
    const e = calcExerciseResponseFactor(exercise, exerciseFactor);
    const s = calcExerciseResponseFactor(size, sizeFactor);
    const r = calcExerciseResponseFactor(rub, rubFactor);
    return {
        ep: sensitivity * e * (s + r),
        size: s,
        rub: r,
    };
}

export interface ExerciseResponseParameter {
    readonly rub: Rub;
    readonly sensitivity: Sensitivity;
    readonly size: Size;
}

export function exerciseResponses(exercises: Exercises, params: ExerciseResponseParameter) {
    const partExercises = canonicalExercise(exercises);
    const responce = {} as ExerciseResponses;
    for (const part of partIds) {
        responce[part] = exerciseResponse({
            part,
            sensitivity: params.sensitivity[part],
            exercise: partExercises[part],
            size: isSizePart(part) ? params.size[part] : 0,
            rub: params.rub[part],
        });
    }
    return responce;
}

import { PartId } from "./PartId";
import { Sensitivity, zeroSensitivity, sensitivityKeys } from "./ActorSexualStatus/Sensitivity";

export interface Exercises extends Partial<Sensitivity>, Partial<ExtraExercises> {}

interface ExtraExercises {
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
    back: number;
    /** 魔力(extra) */
    magic: number;
}

const extraExercisesCoefficient: { [K in keyof ExtraExercises]: Partial<Sensitivity> } = {
    head: {
        skin: 0,
        brain: 0,
        ear: 0,
        mouth: 0,
        tongue: 0,
        throat: 0,
        bust: 0,
        nipple: 0,
        hand: 0,
        arm: 0,
        stomach: 0,
        clitoris: 0,
        urethra: 0,
        bladder: 0,
        labia: 0,
        vagina: 0,
        portio: 0,
        womb: 0,
        ovary: 0,
        anus: 0,
        intestine: 0,
        hip: 0,
        thigh: 0,
        leg: 0,
        foot: 0,
    },
    speak: {
        mouth: 0,
        tongue: 0,
        throat: 0,
    },
    upper: {
        skin: 0,
        brain: 0,
        ear: 0,
        mouth: 0,
        tongue: 0,
        throat: 0,
        bust: 0,
        nipple: 0,
        hand: 0,
        arm: 0,
        stomach: 0,
        clitoris: 0,
        urethra: 0,
        bladder: 0,
        labia: 0,
        vagina: 0,
        portio: 0,
        womb: 0,
        ovary: 0,
        anus: 0,
        intestine: 0,
        hip: 0,
        thigh: 0,
        leg: 0,
        foot: 0,
    },
    chest: {},
    abdominal: {},
    waist: {},
    crotch: {},
    lower: {
        skin: 0,
        brain: 0,
        ear: 0,
        mouth: 0,
        tongue: 0,
        throat: 0,
        bust: 0,
        nipple: 0,
        hand: 0,
        arm: 0,
        stomach: 0,
        clitoris: 0,
        urethra: 0,
        bladder: 0,
        labia: 0,
        vagina: 0,
        portio: 0,
        womb: 0,
        ovary: 0,
        anus: 0,
        intestine: 0,
        hip: 0,
        thigh: 0,
        leg: 0,
        foot: 0,
    },
    back: {},
    magic: {
        skin: 0,
        brain: 0,
        ear: 0,
        mouth: 0,
        tongue: 0,
        throat: 0,
        bust: 0,
        nipple: 0,
        hand: 0,
        arm: 0,
        stomach: 0,
        clitoris: 0,
        urethra: 0,
        bladder: 0,
        labia: 0,
        vagina: 0,
        portio: 0,
        womb: 0,
        ovary: 0,
        anus: 0,
        intestine: 0,
        hip: 0,
        thigh: 0,
        leg: 0,
        foot: 0,
    },
};

const extraExercisesKey = Object.keys(extraExercisesCoefficient) as (keyof ExtraExercises)[];

export function canonicalExercise(exercises: Exercises): Sensitivity {
    const canon = { ...zeroSensitivity };
    for (const extraKey of extraExercisesKey) {
        const extraExercise = exercises[extraKey];
        if (extraExercise) {
            const extra = extraExercisesCoefficient[extraKey];
            for (const partId of sensitivityKeys) {
                const coefficient = extra[partId];
                if (coefficient) canon[partId] = coefficient * extraExercise;
            }
        }
    }
    for (const partId of sensitivityKeys) {
        const exercise = exercises[partId];
        if (exercise) canon[partId] = exercise;
    }
    return canon;
}

interface ExerciseResponseCoefficient {
    rub?: {
        coefficient: number;
        threshold: number;
        baseline?: number;
    };
    exercise: {
        coefficient: number;
        threshold: number;
        baseline?: number;
    };
    size: {
        coefficient: number;
        threshold: number;
        baseline?: number;
    };
}

const zeroCut = (num: number) => (num < 0 ? 0 : num);

type ExerciseResponse = (params: { rub: number; exercise: number; size: number }) => number;

const exerciseResponseCoefficients: { [PId in PartId]: ExerciseResponseCoefficient | ExerciseResponse } = {
    skin: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    brain: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    ear: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    mouth: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    tongue: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    throat: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    bust({ rub, exercise, size }) {
        const exerciseFactor = zeroCut(exercise - (14 - size));
        const sizeFactor = 0.25 * zeroCut(size - 13.75);
        const rubFactor = 1 + rub * 3;
        return exerciseFactor * sizeFactor * rubFactor;
    }, // { exercise: { coefficient: 1000, threshold: 0 }, size: { coefficient: 0.25, threshold: 13.75 } },
    nipple: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    hand: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    arm: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    stomach: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    clitoris: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    urethra: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    bladder: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    labia: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    vagina: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    portio: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    womb: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    ovary: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    anus: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    intestine: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    hip: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: 0 } },
    thigh: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0.1, threshold: 0 } },
    leg: { exercise: { coefficient: 0, threshold: 0 }, size: { coefficient: 0, threshold: -1 } },
    foot: ({ exercise }) => zeroCut(exercise - 100) * 0.1,
};

export function exerciseResponse({
    part,
    exercise,
    size,
    rub = 0,
}: {
    part: PartId;
    exercise: number;
    size: number;
    rub?: number;
}) {
    const exerciseResponseCoefficient = exerciseResponseCoefficients[part];
    if (exerciseResponseCoefficient instanceof Function) {
        return exerciseResponseCoefficient({ exercise, size, rub });
    }
    const { exercise: exerciseFactor, size: sizeFactor } = exerciseResponseCoefficient;
    const e =
        exerciseFactor.coefficient * zeroCut(exercise - exerciseFactor.threshold) + (exerciseFactor.baseline || 0);
    const s = sizeFactor.coefficient * zeroCut(size - sizeFactor.threshold) + (sizeFactor.baseline || 0);
    return e * s;
}

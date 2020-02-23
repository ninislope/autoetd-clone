import { PartId } from "./PartId";
import { partIds } from "./partIds";
import { isSizePart } from "./ActorSexualStatus/Size";
import { Exercises } from "./Exercises";
import { canonicalExercise } from "./canonicalExercise";
import { zeroCut } from "../util";
import { ExerciseResponseFactor, exerciseResponseCoefficients } from "./exerciseResponseCoefficients";
import {
    ExerciseResponseParameterKey,
    ExerciseResponseParameter,
    ExerciseResponse,
    ExerciseResponsesParameter,
    ExerciseResponses,
} from "./ExerciseResponse";

function calcExerciseResponseFactor(
    key: ExerciseResponseParameterKey,
    params: ExerciseResponseParameter,
    factor: ExerciseResponseFactor | undefined,
) {
    if (!factor) return params[key];
    if (factor instanceof Function) return factor(params);
    const { coefficient, threshold, baseline } = factor;
    return (coefficient ?? 1) * zeroCut(params[key] - (threshold || 0)) + (baseline || 0);
}

function filterFloor({ ep, size, rub }: ExerciseResponse) {
    return {
        ep: Math.floor(ep),
        size,
        rub,
    };
}

function exerciseResponse(part: PartId, params: ExerciseResponseParameter): ExerciseResponse {
    const exerciseResponseCoefficient = exerciseResponseCoefficients[part];
    if (exerciseResponseCoefficient instanceof Function) {
        return filterFloor(exerciseResponseCoefficient(params));
    }
    const {
        sensitivity: sensitivityFactor,
        exercise: exerciseFactor,
        size: sizeFactor,
        rub: rubFactor,
        threshold,
        power,
    } = exerciseResponseCoefficient || {};
    const se = calcExerciseResponseFactor("sensitivity", params, sensitivityFactor);
    const e = calcExerciseResponseFactor("exercise", params, exerciseFactor);
    const si = calcExerciseResponseFactor("size", params, sizeFactor);
    const r = calcExerciseResponseFactor("rub", params, rubFactor);
    const res = {
        ep: (power ?? 1) * zeroCut(se * e * (si + r) - (threshold || 0)),
        size: si,
        rub: r,
    };
    return filterFloor(res);
}

export function exerciseResponses(exercises: Exercises, params: ExerciseResponsesParameter) {
    const partExercises = canonicalExercise(exercises);
    const responce = {} as ExerciseResponses;
    for (const part of partIds) {
        responce[part] = exerciseResponse(part, {
            sensitivity: params.sensitivity[part],
            exercise: partExercises[part],
            size: isSizePart(part) ? params.size[part] : 0,
            rub: params.rub[part],
        });
    }
    return responce;
}

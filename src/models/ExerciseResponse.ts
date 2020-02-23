import { PartId } from "./PartId";
import { Rub } from "./ActorSexualStatus/Rub";
import { Sensitivity } from "./ActorSexualStatus/Sensitivity";
import { Size } from "./ActorSexualStatus/Size";

export interface ExerciseResponse {
    readonly ep: number;
    /** 揺れ=サイズ */
    readonly size: number;
    /** 擦れ */
    readonly rub: number;
}

export type ExerciseResponses = {
    [Part in PartId]: ExerciseResponse;
};

export interface ExerciseResponsesParameter {
    readonly rub: Rub;
    readonly sensitivity: Sensitivity;
    readonly size: Size;
}

export interface ExerciseResponseParameter {
    readonly sensitivity: number;
    readonly exercise: number;
    readonly size: number;
    readonly rub: number;
}

export type ExerciseResponseParameterKey = keyof ExerciseResponseParameter;

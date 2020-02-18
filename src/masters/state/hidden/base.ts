import produce from "immer";
import { hiddenState } from "../helper";
import { exerciseResponses } from "../../../models/ExerciseResponses";
import { partIds } from "../../../models/partIds";
import { exerciseResponseT } from "../../../models/exerciseResponseT";

export const base = hiddenState({
    levels: [
        {
            effects: {
                preAction({ action, battlerParameter, field }) {
                    const battler = field.actor(battlerParameter);
                    const responses = exerciseResponses(action.exercises, battler.effectivePerson.sexualStatus);
                    const messages: string[] = [];
                    const nextPerson = produce(battler.person, next => {
                        for (const part of partIds) {
                            const response = responses[part];
                            if (response.ep) {
                                next.variable.ep += response.ep;
                                messages.push(
                                    `${exerciseResponseT(part, battler.effectivePerson.sexualStatus, response)} EP+${
                                        response.ep
                                    }`,
                                );
                            }
                        }
                    });
                    const resultField = field.setActorPerson(battlerParameter, nextPerson);
                    return {
                        messages,
                        resultField,
                    };
                },
            },
        },
    ],
});

import produce from "immer";
import { hiddenState } from "../helper";
import { exerciseResponses } from "../../../models/exerciseResponses";
import { partIds } from "../../../models/partIds";
import { exerciseResponseT } from "../../../models/exerciseResponseT";
import { zeroCut } from "../../../util";

export const base = hiddenState({
    autoLevel: () => 1,
    levels: [
        {
            effects: {
                passive: person =>
                    produce(person, next => {
                        next.sexualStatus.rub.foot = 100;
                    }).setBattleStatus(
                        produce(person.battleStatus, next => {
                            const eBust = zeroCut(person.sexualStatus.size.bust - 22.5); // F cup以上
                            next.agi = Math.max(5, next.agi * (1 - eBust * 0.01));
                        }),
                    ),
                preAction({ action, actorParameter: battlerParameter, field }) {
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

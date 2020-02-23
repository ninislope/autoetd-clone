import produce, { immerable } from "immer";
import { ActorStateLevels } from "./ActorStateLevels";
import { StateId } from "./StateId";
import * as states from "../../masters/state";
import { StateClass } from "./StateClass";
import { PersonClass } from "../PersonClass";
import { present } from "../../util/present";
import { StateLevelClass } from "./StateLevelClass";
import { StateTriggerEffectName, StateTriggerEffects } from "./StateEffects";
import { BattleFieldClass, StateEffectParameterClass, DungeonActionResultContent } from "../BattleLogic";
import { asClass, ElementOf } from "../../util";
import { StateBase } from "./StateBase";
import { genStateOperationResults } from "./genStateOperationResults";

export class ActorStatesClass {
    [immerable] = true;

    static sortStateLevels(stateLevels: StateLevelClass[]) {
        // before/after考慮->id昇順
        return stateLevels.slice().sort((a, b) => {
            const bId = b.parent.id;
            // eslint-disable-next-line no-undef
            if (a.before?.includes(bId)) return -1;
            // eslint-disable-next-line no-undef
            if (a.after?.includes(bId)) return 1;
            const aId = a.parent.id;
            // eslint-disable-next-line no-undef
            if (b.before?.includes(aId)) return 1;
            // eslint-disable-next-line no-undef
            if (b.after?.includes(aId)) return -1;
            if (aId < bId) return -1;
            if (aId > bId) return 1;
            return 0;
        });
    }

    stateLevels: ActorStateLevels;

    constructor(stateLevels: ActorStateLevels) {
        this.stateLevels = stateLevels;
    }

    get(id: StateId) {
        const level = this.stateLevels[id];
        if (!level) return undefined;
        return new StateClass(states[id], id).level(level);
    }

    get sortedStateLevels() {
        return ActorStatesClass.sortStateLevels(
            (Object.keys(states) as StateId[]).map(stateId => this.get(stateId)).filter(present),
        );
    }

    static changeLevel(params: StateEffectParameterClass, id: StateId, levelDiff: number) {
        const currentLevel = params.actor.person.states.stateLevels[id];
        const nextLevel = StateClass.clipLevel(states[id], (currentLevel || 0) + levelDiff);
        const g = genStateOperationResults(params);
        g.next((ret, { actor, lastField, actorParameter }) => {
            const { person } = actor;
            ret({
                resultField: lastField.setActorPerson(
                    actorParameter,
                    person.setStateLevels(
                        produce(person.states.stateLevels, next => {
                            next[id] = nextLevel;
                            if (!next[id]) delete next[id];
                        }),
                    ),
                ),
                messages: [],
            });
        });
        if (nextLevel === currentLevel) return g.result;
        if (currentLevel) {
            g.next((ret, param) => {
                const deactive = new StateClass(states[id], id).level(currentLevel)!.effect("active");
                if (deactive) ret(deactive(param));
            });
        }
        if (nextLevel) {
            g.next((ret, param) => {
                const active = new StateClass(states[id], id).level(nextLevel)!.effect("active");
                if (active) ret(active(param));
            });
        }
        return g.result;
    }

    static levelUp(params: StateEffectParameterClass, id: StateId, levelDiff = 1) {
        return this.changeLevel(params, id, levelDiff);
    }

    static levelDown(params: StateEffectParameterClass, id: StateId, levelDiff = 1) {
        return this.changeLevel(params, id, -levelDiff);
    }

    static clear(params: StateEffectParameterClass, id: StateId) {
        return this.changeLevel(params, id, -Infinity);
    }

    static autoAttach(params: StateEffectParameterClass) {
        const { person } = params.actor;
        const { stateLevels } = person;
        const g = genStateOperationResults(params);
        for (const stateId of Object.keys(states).sort() as StateId[]) {
            const state = states[stateId];
            const { autoLevel } = state as StateBase;
            if (autoLevel) {
                const level = autoLevel(person);
                const levelDiff = level - (stateLevels[stateId] || 0);
                if (levelDiff) g.next((ret, param) => ret(this.changeLevel(param, stateId, levelDiff)));
            }
        }
        return g.result;
    }

    static applyPassive(rawPerson: PersonClass): PersonClass {
        return rawPerson.states.sortedStateLevels
            .map(state => state.effect("passive"))
            .reduce((person, passive) => (passive ? passive(person) : person), rawPerson);
    }

    static triggerEffect<Name extends StateTriggerEffectName>(
        params: ElementOf<Parameters<NonNullable<StateTriggerEffects[Name]>>>,
        name: Name,
    ): DungeonActionResultContent {
        const ParamClass = Object.getPrototypeOf(params).constructor as { new (p: typeof params): typeof params };
        return params.lastField
            .actor(params.actorParameter)
            .person.states.sortedStateLevels.map(state => state.effect(name))
            .filter(present)
            .reduce(
                (result, effect) => {
                    const next = effect!(
                        new ParamClass({
                            ...params,
                            lastField: result.resultField,
                        } as any) as any,
                    );
                    return {
                        resultField: asClass(next.resultField, BattleFieldClass),
                        messages: result.messages.concat(next.messages),
                    };
                },
                {
                    resultField: params.lastField,
                    messages: [] as string[],
                } as DungeonActionResultContent,
            );
    }
}

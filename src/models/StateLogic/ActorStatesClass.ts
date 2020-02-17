import produce, { immerable } from "immer";
import { ActorStateLevels } from "./ActorStateLevels";
import { StateId } from "./StateId";
import * as states from "../../masters/state";
import { StateClass } from "./StateClass";
import { PersonClass } from "../PersonClass";
import { present } from "../../util/present";
import { StateLevelClass } from "./StateLevelClass";
import { StateTriggerEffectName, StateTriggerEffects } from "./StateEffects";
import { ActionEffectResult } from "./ActionEffectResult";
import { BattleFieldClass, BattleField } from "../BattleLogic";
import { asClass, ElementOf } from "../../util";

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

    levelUp(id: StateId, level = 1) {
        const currentLevel = this.stateLevels[id];
        if (currentLevel && currentLevel >= StateClass.maxLevel(states[id])) return this;
        return produce(this, as => {
            const { stateLevels } = as;
            if (!stateLevels[id]) stateLevels[id] = 0;
            stateLevels[id]! += level;
        });
    }

    levelDown(id: StateId, level = 1) {
        return produce(this, as => {
            const { stateLevels } = as;
            if (stateLevels[id]) {
                stateLevels[id]! -= level;
                if (stateLevels[id]! <= 0) delete stateLevels[id];
            }
        });
    }

    clear(id: StateId) {
        return produce(this, as => {
            delete as.stateLevels[id];
        });
    }

    applyPassive(rawPerson: PersonClass): PersonClass {
        return this.sortedStateLevels
            .map(state => state.effect("passive"))
            .reduce((person, passive) => (passive ? passive(person) : person), rawPerson);
    }

    triggerEffect<Name extends StateTriggerEffectName>(
        name: Name,
        params: ElementOf<Parameters<NonNullable<StateTriggerEffects[Name]>>>,
    ): ActionEffectResult {
        return this.sortedStateLevels
            .map(state => state.effect(name))
            .filter(present)
            .reduce(
                (result, effect) => {
                    const next = effect!({
                        ...params,
                        field: asClass(result.resultField, BattleFieldClass),
                    } as any);
                    return { resultField: next.resultField, messages: result.messages.concat(next.messages) };
                },
                {
                    resultField: params.field as BattleField,
                    messages: [] as string[],
                },
            );
    }
}

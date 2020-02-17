import { State } from "./State";
import { StateType } from "./StateType";
import { StateEffects } from "./StateEffects";
import { StateLevelClass } from "./StateLevelClass";
import { StateId } from "./StateId";

export class StateClass implements State {
    static maxLevel(state: State) {
        return state.levels.length;
    }

    readonly id: StateId;

    readonly type: StateType;

    readonly levels: StateLevelClass[];

    readonly name?: string;

    readonly levelName?: boolean;

    readonly description?: string;

    readonly hidden?: true;

    readonly effects?: StateEffects;

    readonly before?: StateId[];

    readonly after?: StateId[];

    constructor(state: State, stateId: StateId) {
        this.id = stateId;
        this.type = state.type;
        this.levels = state.levels.map((stateLevel, index) => new StateLevelClass(stateLevel, index + 1, this));
        this.name = state.name || stateId;
        this.levelName = state.levelName;
        this.description = state.description;
        this.hidden = state.hidden;
        this.effects = state.effects;
        this.before = state.before;
        this.after = state.after;
    }

    level(level: number): StateLevelClass | undefined {
        return this.levels[level - 1];
    }

    get maxLevel() {
        return StateClass.maxLevel(this);
    }
}

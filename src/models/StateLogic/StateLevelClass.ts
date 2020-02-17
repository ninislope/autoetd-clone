/* eslint-disable no-underscore-dangle */
import { StateLevel } from "./StateLevel";
import { StateEffects } from "./StateEffects";
import { StateClass } from "./StateClass";
import { StateId } from "./StateId";

export class StateLevelClass implements StateLevel {
    readonly parent: StateClass;

    readonly level: number;

    private readonly _name?: string;

    readonly levelName?: boolean;

    private readonly _description?: string;

    private readonly _hidden?: true;

    readonly effects?: StateEffects;

    private readonly _before?: StateId[];

    private readonly _after?: StateId[];

    constructor(state: StateLevel, level: number, parent: StateClass) {
        this.parent = parent;
        this.level = level;
        this._name = state.name;
        this.levelName = state.levelName;
        this._description = state.description;
        this._hidden = state.hidden;
        this.effects = state.effects;
        this._before = state.before;
        this._after = state.after;
    }

    get name() {
        const levelName =
            (this.parent.levelName || this.levelName) && this.levelName !== false ? ` Lv.${this.level}` : "";
        const name = this._name || this.parent.name;
        return `${name}${levelName}`;
    }

    get description() {
        return this._description || this.parent.description;
    }

    get hidden() {
        return this._hidden || this.parent.hidden;
    }

    get before() {
        return this._before || this.parent.before;
    }

    get after() {
        return this._after || this.parent.after;
    }

    effect<Name extends keyof StateEffects>(name: Name): StateEffects[Name] {
        const effects = this.effects || {};
        const parentEffects = this.parent.effects || {};
        return effects[name] || parentEffects[name];
    }
}

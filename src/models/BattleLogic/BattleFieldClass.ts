import { immerable } from "immer";
import { BattlerParameter } from "./BattlerParameter";
import { BattlerParametersClass } from "./BattlerParametersClass";
import { BattlersClass } from "./BattlersClass";
import { BattleField } from "./BattleField";
import { PersonClass } from "../PersonClass";
import { BattlerClass } from "./BattlerClass";
import { PersonsClass } from "../PersonsClass";

export class BattleFieldClass implements BattleField {
    [immerable] = true;

    readonly actors: PersonsClass;

    readonly enemies: PersonsClass;

    constructor(field: BattleField) {
        this.actors =
            field.actors instanceof PersonsClass
                ? field.actors
                : new PersonsClass(
                      ...field.actors.map(person => (person instanceof PersonClass ? person : new PersonClass(person))),
                  );
        this.enemies =
            field.enemies instanceof PersonsClass
                ? field.enemies
                : new PersonsClass(
                      ...field.enemies.map(person =>
                          person instanceof PersonClass ? person : new PersonClass(person),
                      ),
                  );
    }

    battlers() {
        return new BattlersClass(...this.characterBattlers().concat(this.enemyBattlers()));
    }

    characterBattlers() {
        return new BattlersClass(
            ...this.actors.map((person, index) => new BattlerClass({ index, person, type: "actors" })),
        );
    }

    enemyBattlers() {
        return new BattlersClass(
            ...this.enemies.map((person, index) => new BattlerClass({ index, person, type: "enemies" })),
        );
    }

    mapBattlers(battlers: BattlerParameter[]) {
        return new BattlersClass(
            ...battlers.map(owner => new BattlerClass({ ...owner, person: this[owner.type][owner.index] })),
        );
    }

    mapCharacters(battlers: BattlerParametersClass) {
        return this.mapBattlers(battlers.filterCharacters());
    }

    mapEnemies(battlers: BattlerParametersClass) {
        return this.mapBattlers(battlers.filterEnemies());
    }

    livingBattlerCount() {
        return this.livingCharacterBattlerCount() + this.livingEnemyBattlerCount();
    }

    livingCharacterBattlerCount() {
        return this.actors.filter(person => person.living).length;
    }

    livingEnemyBattlerCount() {
        return this.enemies.filter(person => person.living).length;
    }

    winner() {
        if (this.livingCharacterBattlerCount() === 0) return "enemies";
        if (this.livingEnemyBattlerCount() === 0) return "actors";
        return undefined;
    }
}

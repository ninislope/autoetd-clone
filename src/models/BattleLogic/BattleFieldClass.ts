import { immerable } from "immer";
import { ActorParameter } from "./ActorParameter";
import { ActorParametersClass } from "./ActorParametersClass";
import { ActorsClass } from "./ActorsClass";
import { BattleField } from "./BattleField";
import { ActorClass } from "./ActorClass";
import { PersonsClass } from "../PersonsClass";
import { asClass } from "../../util";

/** バトル環境 */
export class BattleFieldClass implements BattleField {
    [immerable] = true;

    readonly friends: PersonsClass;

    readonly enemies: PersonsClass;

    constructor(field: BattleField) {
        this.friends = asClass(field.friends, PersonsClass);
        this.enemies = asClass(field.enemies, PersonsClass);
    }

    battlers(type?: "friends" | "enemies") {
        if (type) return type === "friends" ? this.friendBattlers() : this.enemyBattlers();
        return new ActorsClass(...this.friendBattlers().concat(this.enemyBattlers()));
    }

    friendBattlers() {
        return new ActorsClass(
            ...this.friends.map((person, index) => new ActorClass({ index, person, type: "friends" })),
        );
    }

    enemyBattlers() {
        return new ActorsClass(
            ...this.enemies.map((person, index) => new ActorClass({ index, person, type: "enemies" })),
        );
    }

    actor(actorParameter: ActorParameter) {
        return new ActorClass({ ...actorParameter, person: this[actorParameter.type][actorParameter.index] });
    }

    mapActors(actors: ActorParameter[]) {
        return new ActorsClass(...actors.map(this.actor.bind(this)));
    }

    mapFriendActors(actors: ActorParametersClass) {
        return this.mapActors(actors.filterFriends());
    }

    mapEnemyActors(actors: ActorParametersClass) {
        return this.mapActors(actors.filterEnemies());
    }

    livingBattlerCount() {
        return this.livingFriendBattlerCount() + this.livingEnemyBattlerCount();
    }

    livingFriendBattlerCount() {
        return this.friends.filter(person => person.living).length;
    }

    livingEnemyBattlerCount() {
        return this.enemies.filter(person => person.living).length;
    }

    winner() {
        if (this.livingFriendBattlerCount() === 0) return "enemies";
        if (this.livingEnemyBattlerCount() === 0) return "friends";
        return undefined;
    }
}

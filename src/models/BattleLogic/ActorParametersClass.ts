import { immerable } from "immer";
import { toExistsHash } from "../../util";
import { BattleFieldClass } from "./BattleFieldClass";
import { ActorParameterClass } from "./ActorParameterClass";
import { extendsArray } from "../../util/extendsArray";

@extendsArray()
export class ActorParametersClass extends Array<ActorParameterClass> {
    [immerable] = true;

    static readonly elementType = ActorParameterClass;

    filterFriends() {
        return new ActorParametersClass(...this.filter(battler => battler.type === "friends"));
    }

    filterEnemies() {
        return new ActorParametersClass(...this.filter(battler => battler.type === "enemies"));
    }

    rejectFriends(field: BattleFieldClass) {
        const characterOwnerIndexes = toExistsHash(this.filterFriends().indexes());
        return new ActorParametersClass(
            ...field.friends
                .map((_c, index) => index)
                .filter(index => !characterOwnerIndexes[index])
                .map(index => new ActorParameterClass({ type: "friends", index })),
        );
    }

    rejectEnemies(field: BattleFieldClass) {
        const enemyOwnerIndexes = toExistsHash(this.filterEnemies().indexes());
        return new ActorParametersClass(
            ...field.enemies
                .map((_c, index) => index)
                .filter(index => !enemyOwnerIndexes[index])
                .map(index => new ActorParameterClass({ type: "enemies", index })),
        );
    }

    indexes() {
        return this.map(battler => battler.index);
    }
}

import { reduxHelper } from "./reduxHelper";
// eslint-disable-next-line import/named
import { MainStore, SceneId, BattleClass, PersonsClass } from "../models";
import * as friends from "../masters/person/friends";
import * as enemies from "../masters/person/enemies";
import { asClass } from "../util";

const { createActions, action, reduceAction } = reduxHelper<MainStore>({
    currentScene: "dungeon",
    persons: [friends.アリス, friends.栞],
    party: [],
    clearedDungeonIds: [],
    dungeonFloor: 0,
    dungeonId: 0,
    dungeonLogSpeed: 1,
    dungeonTurn: 0,
    dungeonLogIndex: 0,
    dungeonLogs: [],
    abortDungeon: false,
});

const { reducer, actionCreators, actionTypes } = createActions("main", {
    changeScene: reduceAction((state, currentScene: SceneId) => ({
        ...state,
        currentScene,
    })),

    initializeDungeon: reduceAction(state => ({
        ...state,
        dungeonFloor: 1,
        dungeonTurn: 1,
        dungeonLogSpeed: 5,
        dungeonLogIndex: 0,
        dungeonLogs: [],
    })),
    progressDungeonTurn: reduceAction(state => ({
        ...state,
        dungeonTurn: state.dungeonTurn + 1,
    })),
    progressDungeonLog: reduceAction(state => {
        const dungeonLogIndex = state.dungeonLogIndex + 1;
        // ログの最後を超過したら次のアクションを決定する
        if (state.dungeonLogs.length < dungeonLogIndex + 1) {
            let battle: BattleClass | undefined;
            let { battleActionIndex } = state;
            const beginLogs = [];
            if (state.battle) {
                battle = state.battle;
            } else {
                if (!asClass(state.persons, PersonsClass).living().length) return { ...state, dungeonLogIndex };
                // TODO: 確率でバトル始まる
                if (Math.random() < 0.5) {
                    return {
                        ...state,
                        dungeonLogIndex,
                        dungeonLogs: [...state.dungeonLogs, `${state.party.length}人は周囲を探索したがなにもなかった`],
                    };
                }
                // TODO: バトル開始文言等
                beginLogs.push("バトル開始!");
                battle = new BattleClass({
                    initialField: {
                        friends: state.persons,
                        enemies: [enemies.スライム], // TODO
                    },
                    actions: [],
                });
            }
            if (battle) {
                battle = battle.progressAction();
                const latestActions = battle.actions.slice(battleActionIndex);
                battleActionIndex = battle.actions.length;
                const dungeonLogs = [
                    ...state.dungeonLogs,
                    ...beginLogs,
                    ...latestActions.reduce((messages, a) => messages.concat(a.messages), [] as string[]),
                ];
                const persons = battle.lastField().friends.mergeList(state.persons);
                const winner = battle.winner();
                // TODO: 戦闘終了文言
                if (winner) {
                    dungeonLogs.push(`${winner === "friends" ? "勝利した!" : "敗北してしまった!"}`);
                    battle = undefined;
                    battleActionIndex = undefined;
                }
                return { ...state, persons, dungeonLogIndex, dungeonLogs, battle, battleActionIndex };
            }
        }
        return { ...state, dungeonLogIndex };
    }),
    waitDungeonLog: action<number>(),
    speedUpDungeonLog: reduceAction(state => ({ ...state, dungeonLogSpeed: state.dungeonLogSpeed + 1 })),
    speedDownDungeonLog: reduceAction(state => ({ ...state, dungeonLogSpeed: state.dungeonLogSpeed - 1 })),
});

export default reducer;

export const {
    changeScene,

    initializeDungeon,
    progressDungeonTurn,
    progressDungeonLog,
    waitDungeonLog,
    speedUpDungeonLog,
    speedDownDungeonLog,
} = actionCreators;

export { actionTypes };

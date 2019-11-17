import { takeLeading, call, put } from "redux-saga/effects";
import { progressDungeonLog, waitDungeonLog, actionTypes } from "../modules/main";

function wait(interval: number) {
    return new Promise(resolve => setTimeout(resolve, interval));
}

function* waitDungeonLogWorker(action: ReturnType<typeof waitDungeonLog>) {
    if (!action.payload) return;
    yield call(wait, 2000 / action.payload);
    yield put(progressDungeonLog());
}

export function* dungeonSaga() {
    yield takeLeading(actionTypes.waitDungeonLog, waitDungeonLogWorker);
}

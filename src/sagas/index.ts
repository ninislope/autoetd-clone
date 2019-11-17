import { all } from "redux-saga/effects";
import { dungeonSaga } from "./dungeonSaga";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function* rootSaga() {
    yield all([dungeonSaga()]);
}

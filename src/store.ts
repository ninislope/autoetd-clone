import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./modules";
import rootSaga from "./sagas";
import DevTools from "./components/DevTools";
import { isProduction, present } from "./util";

const composeEnhancers = isProduction ? compose : (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const instrument =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || isProduction ? undefined : DevTools.instrument();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeEnhancers(...[applyMiddleware(sagaMiddleware), instrument].filter(present)));

let sagaTask = sagaMiddleware.run(rootSaga);

if ((module as any).hot) {
    (module as any).hot.accept("./modules", () => {
        // eslint-disable-next-line global-require
        const nextReducer = require("./modules").default;
        store.replaceReducer(nextReducer);
    });
    (module as any).hot.accept("./sagas", () => {
        // eslint-disable-next-line global-require
        const nextRootSaga = require("./sagas").default;
        sagaTask.cancel();
        sagaTask.toPromise().then(() => {
            sagaTask = sagaMiddleware.run(nextRootSaga);
        });
    });
}

export default store;

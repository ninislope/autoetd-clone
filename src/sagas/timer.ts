import { eventChannel, END } from "redux-saga";

export function intervalEvent(interval: number, initial = true) {
    return eventChannel<void>(emitter => {
        const emit = () => emitter();
        const id = setInterval(emit, interval);
        if (initial) setImmediate(emit);
        return () => clearInterval(id);
    });
}

export function timeoutEvent(interval: number) {
    return eventChannel<void>(emitter => {
        const emit = () => emitter(END);
        const id = setTimeout(emit, interval);
        return () => clearTimeout(id);
    });
}

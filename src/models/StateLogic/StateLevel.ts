import { StateId } from "./StateId";
import { HasEffect } from "./HasEffect";

export interface StateLevel extends HasEffect<StateId> {
    /** 名前の前にレベルがつく */
    readonly levelName?: boolean;
    /** 一覧に表示しない */
    readonly hidden?: true;
}

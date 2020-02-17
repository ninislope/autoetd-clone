/* eslint-disable import/no-cycle */
import { ActorParameter } from "./ActorParameter";
import { Person } from "../Person";

export interface Actor extends ActorParameter {
    readonly person: Person;
}

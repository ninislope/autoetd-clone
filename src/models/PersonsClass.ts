import { immerable } from "immer";
import { PersonClass } from "./PersonClass";
import { indexBy } from "../util";
import { Person } from "./Person";

export class PersonsClass extends Array<PersonClass> {
    [immerable] = true;

    mergeList(persons: Person[]) {
        const indexed = indexBy(this, "id");
        return new PersonsClass(...persons.map(person => indexed[person.id] || person));
    }

    living() {
        return this.filter(person => person.living);
    }
}

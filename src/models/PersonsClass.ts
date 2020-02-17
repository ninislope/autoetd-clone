import { immerable } from "immer";
import { PersonClass } from "./PersonClass";
import { indexBy } from "../util";
import { Person } from "./Person";
import { extendsArray } from "../util/extendsArray";

@extendsArray()
export class PersonsClass extends Array<PersonClass> {
    [immerable] = true;

    static elementType = PersonClass;

    mergeList(persons: Person[]) {
        const indexed = indexBy(this, "id");
        return new PersonsClass(...persons.map(person => indexed[person.id] || person));
    }

    living() {
        return this.filterPersons(person => person.living);
    }

    dead() {
        return this.filterPersons(person => !person.living);
    }

    filterPersons(callbackfn: (value: PersonClass, index: number, array: PersonClass[]) => unknown) {
        return new PersonsClass(...this.filter(callbackfn));
    }
}

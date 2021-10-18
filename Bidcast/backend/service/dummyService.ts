import { Knex } from "knex";

export class DummyService {
    constructor(private knex: Knex) {}

    print = () => {
        console.log(this.knex);
    };

    findRoom = (token: string) => {
        if (token == "123") {
            return "abc";
        } else {
            return "";
        }
    };
}

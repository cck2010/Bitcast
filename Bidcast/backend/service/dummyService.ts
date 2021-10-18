import { Knex } from "knex";

export class DummyService {
    constructor(private knex: Knex) {}

    print = () => {
        console.log(this.knex);
    };

    SellerChecking = (token: string) => {
        if (token == "123") {
            return true;
        } else {
            return false;
        }
    };
}

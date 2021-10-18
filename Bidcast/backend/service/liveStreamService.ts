import { Knex } from "knex";

export class LiveStreamService {
    constructor(private knex: Knex) {}

    print = () => {
        console.log(this.knex);
    };

    getRoom = (token: string) => {
        if (token == "123") {
            return "abc";
        } else {
            return "";
        }
    };

    getInfo = (room: string, token: string) => {
        if (room !== "") {
            return {
                id: 1,
                title: "Test Title",
                seller: "tester",
                sellerImage: "https://img.tw.observer/images/vS4jQ2W.jpg",
                currentViewers: 0,
                thumbnail: "https://placeimg.com/1280/840/nature",
            };
        } else {
            return {
                id: 1,
                title: "Test Title",
                seller: "tester",
                sellerImage: "https://img.tw.observer/images/vS4jQ2W.jpg",
                currentViewers: 0,
                thumbnail: "https://placeimg.com/1280/840/nature",
            };
        }
    };
}

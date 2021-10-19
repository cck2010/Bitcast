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

    getProducts = (liveId: number) => {
        return [
            {
                id: 0,
                productName: "pooh1",
                minPrice: 10,
                currentPrice: 10,
                buyPrice: 100,
                bidIncrement: 10,
                productImage:
                    "https://cdn.shopify.com/s/files/1/0339/7091/3412/products/POPMARTWinniethePooh.jpg",
                isSelected: false,
                duration: 2,
                isEnded: false,
            },
            {
                id: 1,
                productName: "pooh2",
                minPrice: 25,
                currentPrice: 25,
                buyPrice: 200,
                bidIncrement: 5,
                productImage:
                    "https://lumiere-a.akamaihd.net/v1/images/c94eed56a5e84479a2939c9172434567c0147d4f.jpeg",
                isSelected: false,
                duration: 2,
                isEnded: false,
            },
            {
                id: 2,
                productName: "pooh3",
                minPrice: 30,
                currentPrice: 30,
                buyPrice: 300,
                bidIncrement: 9,
                productImage:
                    "https://winniethepoohshow.com/assets/img/WTP-PoohHoneypot-Placeholder.png",
                isSelected: false,
                duration: 2,
                isEnded: false,
            },
            {
                id: 3,
                productName: "pooh4",
                minPrice: 40,
                currentPrice: 40,
                buyPrice: 400,
                bidIncrement: 4,
                productImage:
                    "https://www.rd.com/wp-content/uploads/2020/01/shutterstock_247528582-2-copy-scaled.jpg",
                isSelected: false,
                duration: 2,
                isEnded: false,
            },
        ];
    };
}

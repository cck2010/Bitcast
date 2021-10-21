import { Knex } from "knex";
import { LiveStreamProduct } from "../controller/liveStreamController";

export class LiveStreamService {
    constructor(private knex: Knex) {}

    print = () => {
        console.log(this.knex);
    };

    getRoom = async (token: string) => {
        const roomResult = await this.knex("live")
            .select("buyer_link")
            .where("seller_link", token);
        if (roomResult.length === 0) {
            return "";
        } else {
            return roomResult[0].buyer_link;
        }
    };

    getInfo = async (room: string, token: string) => {
        const liveResult = await this.knex("live")
            .select(
                "id",
                "title",
                "user_id",
                "current_viewers",
                "image",
                "description"
            )
            .where(
                `${room !== "" ? "buyer_link" : "seller_link"}`,
                room !== "" ? room : token
            );
        if (liveResult.length === 0) {
            return {
                id: -1,
                title: "Error",
                seller: "Error",
                sellerImage: "/defaultUser.png",
                currentViewers: 0,
                thumbnail: "",
                description: "",
                success: false,
            };
        }

        const userResult = (
            await this.knex("users")
                .select("username", "profile_pic")
                .where("id", liveResult[0].user_id)
        )[0];

        return {
            id: liveResult[0].id,
            title: liveResult[0].title,
            seller: userResult.username,
            sellerImage:
                userResult.profile_pic == null
                    ? "/defaultUser.png"
                    : userResult.profile_pic,
            currentViewers: liveResult[0].current_viewers,
            thumbnail: liveResult[0].image,
            description: liveResult[0].description,
        };
    };

    getProducts = async (liveId: number) => {
        const productsResult = await this.knex("products")
            .select(
                "id",
                "product_name",
                "min_price",
                "current_price",
                "buy_price",
                "bid_increment",
                "product_image",
                "is_selected",
                "duration",
                "countdown_end_time",
                "description"
            )
            .where("live_id", liveId);

        let products: LiveStreamProduct[] = [];
        const minusSeconds = function (date: Date, sec: number) {
            date.setTime(date.getTime() - sec * 1000);
            return date;
        };
        let time = new Date();
        let minusTime = minusSeconds(time, 100);

        for (let productResult of productsResult) {
            let product: LiveStreamProduct = {
                id: -1,
                productName: "",
                minPrice: 0,
                currentPrice: 0,
                buyPrice: 0,
                bidIncrement: 0,
                productImage: "",
                isSelected: false,
                duration: 0,
                countdownEndTime: minusTime,
                description: "",
            };
            product["id"] = productResult.id;
            product["productName"] = productResult.product_name;
            product["minPrice"] = productResult.min_price;
            product["currentPrice"] = productResult.current_price;
            product["buyPrice"] = productResult.buy_price;
            product["bidIncrement"] = productResult.bid_increment;
            product["productImage"] = productResult.product_image;
            product["isSelected"] = productResult.is_selected;
            product["duration"] = productResult.duration;
            product["countdownEndTime"] = productResult.countdown_end_time;
            product["description"] = productResult.description;
            products.push(product);
        }
        return products;
    };
}

import { Knex } from "knex"

export class ComingAuctionService {
    constructor(private knex: Knex) { }

    print = () =>{
        console.log(this.knex);
    }

    getComingAuction = () => {
        return [
            {
                id: 0,
                productName: "wine1",
                minPrice: 500,
                productImage: "http://image.digitalinsightresearch.in/uploads/imagelibrary/Archive/Main/Red-wine.jpg",
                duration: 2,
            },
            {
                id: 1,
                productName: "wine2",
                minPrice: 600,
                productImage: "http://image.digitalinsightresearch.in/uploads/imagelibrary/Archive/Main/Red-wine.jpg",
                duration: 3,
            },
            {
                id: 2,
                productName: "wine3",
                minPrice: 700,
                productImage: "http://image.digitalinsightresearch.in/uploads/imagelibrary/Archive/Main/Red-wine.jpg",
                duration: 4,
            },
        ]
    }
}
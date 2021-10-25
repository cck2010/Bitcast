import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSameCategoryLive } from "../../redux/LiveStream/actions";
import { RootState } from "../../store";

function LiveStreamRecommend() {
    interface Recommendation {
        id: number;
        title: string;
        thumbnail: string;
    }
    const dispatch = useDispatch();

    const products = useSelector(
        (state: RootState) =>
            state.liveStream.liveStreamProducts.liveStreamProductsArr
    );

    useEffect(() => {
        let categoryIdSet = new Set<number>();
        for (let product of products) {
            categoryIdSet.add(product.categoryId);
        }
        dispatch(fetchSameCategoryLive(categoryIdSet));
    }, [dispatch, products]);

    const recommendation: Recommendation[] = [
        {
            id: 0,
            title: "推薦直播1",
            thumbnail:
                "https://randomwordgenerator.com/img/picture-generator/52e3dd474a56b10ff3d8992cc12c30771037dbf85254794e722a7cd09749_640.jpg",
        },
        {
            id: 1,
            title: "推薦直播2",
            thumbnail:
                "https://randomwordgenerator.com/img/picture-generator/54e0d7474850ac14f1dc8460962e33791c3ad6e04e507441722978d6944cc4_640.jpg",
        },
        {
            id: 2,
            title: "推薦直播3",
            thumbnail:
                "https://randomwordgenerator.com/img/picture-generator/52e5dc434d55a414f1dc8460962e33791c3ad6e04e5074417c2e7dd19f4bcd_640.jpg",
        },
    ];

    return (
        <div className="LiveStreamRecommend my-3">
            {recommendation.map((item) => (
                <div
                    className="recommendAuction m-3 d-flex flex-column justify-content-between"
                    key={item.id}
                >
                    <img
                        className="thumbnail w-100 mb-3"
                        src={item.thumbnail}
                        alt="recommendAuction"
                    />
                    <div className="title text-center">{item.title}</div>
                </div>
            ))}
        </div>
    );
}

export default LiveStreamRecommend;

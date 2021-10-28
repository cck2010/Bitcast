import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscribe } from "../../redux/user/actions";
import { RootState } from "../../store";

interface SubscriptionBtnProps {
    targetId: number;
    userId: number;
}

function SubscribeButton(props: SubscriptionBtnProps) {
    //Get States
    const dispatch = useDispatch();
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [isSelf, setIsSelf] = useState<boolean>(false);
    const subscribeList = useSelector(
        (state: RootState) => state.following.userId
    );
    //Get States

    //Check Subscription
    useEffect(() => {
        dispatch(fetchSubscribe(true));
    }, [dispatch]);
    useEffect(() => {
        let check = false;
        for (let item of subscribeList) {
            if (item === props.targetId) {
                check = true;
            }
        }
        if (check) {
            setIsSubscribed(true);
        } else {
            setIsSubscribed(false);
        }
    }, [subscribeList, props.targetId]);
    //Check Subscription

    //Check Same Person
    useEffect(() => {
        if (props.targetId === props.userId) {
            setIsSelf(true);
        } else {
            setIsSelf(false);
        }
    }, [props.targetId, props.userId]);
    //Check Same Person
    return (
        <>
            {!isSelf && (
                <div className="subscribe">
                    <button
                        className={`subscribe_btn btn ${
                            isSubscribed ? "btn-secondary" : "btn-danger"
                        }`}
                        onClick={() => {
                            dispatch(fetchSubscribe(false, props.targetId));
                        }}
                    >
                        {isSubscribed ? "已關注" : "關注"}{" "}
                        {isSubscribed ? (
                            <i className="fas fa-bell-slash"></i>
                        ) : (
                            <i className="fas fa-bell"></i>
                        )}
                    </button>
                </div>
            )}
        </>
    );
}

export default SubscribeButton;

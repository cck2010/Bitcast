import { useEffect, useState } from "react";
import axios from "axios";
import { websiteURL } from "../configuration/webSiteInfo";

export function useLiveStreamToken(token: string | null) {
    const [room, setRoom] = useState("");
    useEffect(() => {
        interface AxioxRes {
            result: string;
        }
        async function load() {
            const res = await axios.get<AxioxRes>(
                `${websiteURL}/room?=${token}`
            );
            console.log(res);
            setRoom(res.data.result);
        }
        load();
    }, [token]);
    return room;
}

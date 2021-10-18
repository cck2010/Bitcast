import { useEffect, useState } from "react";
import axios from "axios";
import { websiteURL } from "../configuration/webSiteInfo";

export function useLiveStreamToken(token: string | null) {
    const [room, setRoom] = useState<string>("");
    useEffect(() => {
        interface AxiosRes {
            result: string;
        }
        async function load() {
            const res = await axios.get<AxiosRes>(
                `${websiteURL}/room?token=${token}`
            );
            setRoom(res.data.result);
        }

        load();
    }, [token, room]);
    return room;
}

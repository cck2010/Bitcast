import { useEffect, useState } from "react";
import axios from "axios";

export function useLiveStreamToken(token: string | null) {
    const [room, setRoom] = useState<string>("");
    useEffect(() => {
        interface AxiosRes {
            room: string;
        }

        async function load() {
            const res = await axios.get<AxiosRes>(
                `${process.env.REACT_APP_BACKEND_URL}/room?token=${token}`
            );
            setRoom(res.data.room);
        }

        load();
    }, [token, room]);
    return room;
}

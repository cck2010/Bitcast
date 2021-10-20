import React from "react";
// import { Socket } from "socket.io-client";

interface DescriptionProps {
    // ws: Socket | null;
    description: string;
}

function LiveStreamDescription(props: DescriptionProps) {
    return (
        <div className="LiveStreamDescription me-3 p-3 h-75">
            {props.description}
        </div>
    );
}

export default LiveStreamDescription;

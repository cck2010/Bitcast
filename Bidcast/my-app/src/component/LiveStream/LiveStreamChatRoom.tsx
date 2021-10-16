import React, { useCallback, useRef, useState } from "react";
import CustomScroll from "react-custom-scroll";

// const generateMessage = () => {
//     const words = [
//         "The sky",
//         "above",
//         "the port",
//         "was",
//         "the color of television",
//         "tuned",
//         "to",
//         "a dead channel",
//         ".",
//         "All",
//         "this happened",
//         "more or less",
//         ".",
//         "I",
//         "had",
//         "the story",
//         "bit by bit",
//         "from various people",
//         "and",
//         "as generally",
//         "happens",
//         "in such cases",
//         "each time",
//         "it",
//         "was",
//         "a different story",
//         ".",
//         "It",
//         "was",
//         "a pleasure",
//         "to",
//         "burn",
//     ];
//     const text = [];
//     let x = 7;
//     while (--x) text.push(words[Math.floor(Math.random() * words.length)]);
//     return text.join(" ");
// };

interface LiveStreamChatRoomProps {
    liveStreamRef: React.RefObject<HTMLDivElement>;
}

function LiveStreamChatRoom(props: LiveStreamChatRoomProps) {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");

    // useEffect(() => {
    //     const generateDummyMessage = () => {
    //         setInterval(() => {
    //             setMessages((prevMsg) => [...prevMsg, generateMessage()]);
    //         }, 2000);
    //     };
    //     generateDummyMessage();
    // }, []);

    //drag function
    const [size, setSize] = useState<number>(0);
    const dragRef = useRef<HTMLDivElement>(null);

    const dragHandler = useCallback(() => {
        function onMouseMove(e: MouseEvent) {
            setSize((currentSize) => currentSize + e.movementY);
        }
        function onMouseUp() {
            props.liveStreamRef?.current?.removeEventListener(
                "mousemove",
                onMouseMove
            );
            props.liveStreamRef?.current?.removeEventListener(
                "mouseup",
                onMouseUp
            );
        }
        props.liveStreamRef?.current?.addEventListener(
            "mousemove",
            onMouseMove
        );
        props.liveStreamRef?.current?.addEventListener("mouseup", onMouseUp);
    }, [props.liveStreamRef]);
    //drag function

    return (
        <div className="LiveStreamChatRoom">
            <div
                className="LiveStreamChatRoomMainBody p-3"
                style={{ height: `${658 + size}px` }}
            >
                <div className="chat">
                    <div className="head text-center">聊天室</div>
                    <CustomScroll keepAtBottom={true}>
                        <div
                            className="messages"
                            style={{ height: `${535 + size}px` }}
                        >
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`msg${
                                        i % 2 !== 0 ? " dark" : ""
                                    } pe-3`}
                                >
                                    {m}
                                </div>
                            ))}
                        </div>
                    </CustomScroll>
                    <div className="footer d-flex mb-3">
                        <input
                            className="inputBox w-100"
                            type="text"
                            placeholder="請在此輸入留言..."
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setInputMessage(e.target.value)}
                        />
                        <button
                            className="sendBtn"
                            onClick={() => {
                                setMessages([...messages, inputMessage]);
                            }}
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className="dragBtn text-center"
                ref={dragRef}
                onMouseDown={dragHandler}
            >
                <i className="fas fa-arrows-alt-v"></i>{" "}
                按此拉動滑鼠調整聊天室長度
            </div>
        </div>
    );
}

export default LiveStreamChatRoom;

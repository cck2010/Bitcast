import React, { useCallback, useEffect, useRef, useState } from "react";

const generateMessage = () => {
    const words = [
        "The sky",
        "above",
        "the port",
        "was",
        "the color of television",
        "tuned",
        "to",
        "a dead channel",
        ".",
        "All",
        "this happened",
        "more or less",
        ".",
        "I",
        "had",
        "the story",
        "bit by bit",
        "from various people",
        "and",
        "as generally",
        "happens",
        "in such cases",
        "each time",
        "it",
        "was",
        "a different story",
        ".",
        "It",
        "was",
        "a pleasure",
        "to",
        "burn",
    ];
    const text = [];
    let x = 7;
    while (--x) text.push(words[Math.floor(Math.random() * words.length)]);
    return text.join(" ");
};

function LiveStreamChatRoom() {
    const messageEl = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<string[]>([]);

    const [size, setSize] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);

    const dragHandler = useCallback(() => {
        function onMouseMove(e: MouseEvent) {
            setSize((currentSize) => currentSize + e.movementY);
        }
        function onMouseUp() {
            if (ref && ref.current) {
                ref.current.removeEventListener("mousemove", onMouseMove);
                ref.current.removeEventListener("mouseup", onMouseUp);
            }
        }
        if (ref && ref.current) {
            ref.current.addEventListener("mousemove", onMouseMove);
            ref.current.addEventListener("mouseup", onMouseUp);
        }
    }, []);

    useEffect(() => {
        if (messageEl && messageEl.current) {
            messageEl.current.addEventListener("DOMNodeInserted", (event) => {
                const { currentTarget: target } = event;
                // console.log(target);

                // target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, []);

    useEffect(() => {
        const generateDummyMessage = () => {
            setInterval(() => {
                setMessages((prevMsg) => [...prevMsg, generateMessage()]);
            }, 2000);
        };
        generateDummyMessage();
    }, []);

    return (
        <div className="LiveStreamChatRoom">
            <div
                className="LiveStreamChatRoomMainBody p-3"
                style={{ height: `${658 + size}px` }}
            >
                <div className="chat">
                    <div className="head text-center">聊天室</div>
                    <div
                        className="messages"
                        ref={messageEl}
                        style={{ height: `${545 + size}px` }}
                    >
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`msg${i % 2 !== 0 ? " dark" : ""}`}
                            >
                                {m}
                            </div>
                        ))}
                    </div>
                    <div className="footer">
                        <input
                            className="w-100"
                            type="text"
                            placeholder="請在此輸入留言..."
                        />
                    </div>
                </div>
            </div>
            <div
                className="dragBtn text-center"
                ref={ref}
                onMouseDown={dragHandler}
            >
                <i className="fas fa-arrows-alt-v"></i>{" "}
                按此拉動滑鼠調整聊天室長度
            </div>
        </div>
    );
}

export default LiveStreamChatRoom;

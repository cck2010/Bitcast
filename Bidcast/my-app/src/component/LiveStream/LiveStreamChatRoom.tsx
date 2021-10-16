import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomScroll from "react-custom-scroll";

interface LiveStreamChatRoomProps {
    liveStreamRef: React.RefObject<HTMLDivElement>;
    isTablet: boolean;
}

function LiveStreamChatRoom(props: LiveStreamChatRoomProps) {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");

    //scroll button
    const messagesRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
        const containerHeight = event.currentTarget.clientHeight;
        const scrollHeight = event.currentTarget.scrollHeight;

        const scrollTop = event.currentTarget.scrollTop;
        setIsVisible(scrollTop + containerHeight < scrollHeight ? true : false);
    };

    const scrollToBottom = () => {
        messagesRef.current?.parentElement?.parentElement?.scrollTo({
            top: messagesRef.current?.scrollHeight,
        });
    };
    //scroll button

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

    //chatroom mobile mode resize
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    //chatroom mobile mode resize

    return (
        <div className="LiveStreamChatRoom">
            <div
                className="LiveStreamChatRoomMainBody p-3"
                style={
                    props.isTablet
                        ? { height: `${658 + size}px` }
                        : {
                              height: `${
                                  windowDimensions.height -
                                  windowDimensions.width / 2 -
                                  100
                              }px`,
                          }
                }
            >
                <div className="chat">
                    <div className="head text-center">聊天室</div>
                    <CustomScroll
                        className="customScroll"
                        keepAtBottom={true}
                        onScroll={scrollHandler}
                    >
                        <div
                            className="messages"
                            style={
                                props.isTablet
                                    ? { height: `${535 + size}px` }
                                    : {
                                          height: `${
                                              windowDimensions.height -
                                              windowDimensions.width / 2 -
                                              225
                                          }px`,
                                      }
                            }
                            ref={messagesRef}
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
                    <div className="dummyLayer">
                        {isVisible && (
                            <button
                                className="scrollToBottom btn btn-primary rounded-circle"
                                onClick={scrollToBottom}
                                style={{}}
                            >
                                <i className="fas fa-arrow-down"></i>
                            </button>
                        )}
                    </div>
                    <div className="footer d-flex mb-3">
                        <input
                            className="inputBox w-100"
                            type="text"
                            placeholder="請在此輸入留言..."
                            value={inputMessage}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setInputMessage(e.target.value)}
                            onKeyDown={(
                                e: React.KeyboardEvent<HTMLInputElement>
                            ) => {
                                if (e.key === "Enter") {
                                    setMessages([...messages, inputMessage]);
                                    setInputMessage("");
                                }
                            }}
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
            {props.isTablet && (
                <div
                    className="dragBtn text-center px-3"
                    ref={dragRef}
                    onMouseDown={dragHandler}
                >
                    <i className="fas fa-arrows-alt-v"></i>{" "}
                    按此拉動滑鼠調整聊天室長度
                </div>
            )}
        </div>
    );
}

export default LiveStreamChatRoom;

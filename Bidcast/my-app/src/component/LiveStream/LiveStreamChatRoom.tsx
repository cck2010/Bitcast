import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomScroll from "react-custom-scroll";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import {
    fetchChatMessages,
    sendChatMessages,
    UpdateMessage,
} from "../../redux/LiveStream/actions";
import { RootState } from "../../store";

interface LiveStreamChatRoomProps {
    liveStreamRef: React.RefObject<HTMLDivElement>;
    isTablet: boolean;
    ws: Socket | null;
}

function getRandomColor() {
    var letters = "456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function LiveStreamChatRoom(props: LiveStreamChatRoomProps) {
    //Get States
    const dispatch = useDispatch();
    const [inputMessage, setInputMessage] = useState<string>("");
    const liveId = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.id
    );
    const messages = useSelector(
        (state: RootState) => state.liveStream.chat.chatMessages
    );
    const [color, setColor] = useState<string[]>(["#000000"]);
    useEffect(() => {
        let colorArr = [];
        for (let ind = 0; ind < 10; ind++) {
            colorArr.push(getRandomColor());
        }
        setColor(colorArr);
    }, []);
    //Get States

    //Scroll button
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

    useEffect(() => {
        scrollToBottom();
    }, []);
    //Scroll button

    //Drag function
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
    //Drag function

    //Chatroom mobile mode resize
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
    //Chatroom mobile mode resize

    //Send Message Handler
    const sendMessageHandler = (inputMessage: string) => {
        if (props.ws) {
            dispatch(fetchChatMessages(props.ws, liveId, inputMessage));
        }
    };
    //Send Message Handler

    //WebSocket Signal Handler
    useEffect(() => {
        if (props.ws) {
            props.ws.on("sendMessage", (message: UpdateMessage) => {
                dispatch(sendChatMessages(message));
            });
        }
    }, [dispatch, props.ws]);
    //WebSocket Signal Handler

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
                                  175
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
                                              300
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
                                    } pe-3 mt-1 mx-1 d-flex`}
                                >
                                    <img
                                        className="chat_propic rounded-circle me-1"
                                        src={`${
                                            m.profile_pic.search(
                                                /(https:\/\/)|(http:\/\/)/i
                                            ) < 0
                                                ? process.env
                                                      .REACT_APP_BACKEND_URL +
                                                  "/" +
                                                  m.profile_pic
                                                : m.profile_pic
                                        }`}
                                        alt={`profile pic ${m.username}`}
                                    />
                                    <div>
                                        <span
                                            className="chat_username me-2"
                                            style={{
                                                color: color[
                                                    m.username.length %
                                                        color.length
                                                ],
                                            }}
                                        >
                                            {m.username}
                                        </span>
                                        {m.message}
                                    </div>
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
                                    sendMessageHandler(inputMessage);
                                    setInputMessage("");
                                }
                            }}
                        />
                        <button
                            className="sendBtn"
                            onClick={() => {
                                sendMessageHandler(inputMessage);
                                setInputMessage("");
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

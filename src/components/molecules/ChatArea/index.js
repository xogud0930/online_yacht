import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatLog from '../../atoms/ChatLog';
import socketio from 'socket.io-client';

const ChatArea = ({
    room,
    playerList,
    setPlayerList,
    leaveState,
    setLeaveState,
    path,
}) => {
    const [socket, setSocket] = useState();

    useEffect(() => {
        setSocket(socketio.connect('http://localhost:6050'));
    }, [])

    return (
        <>
            {socket ?
            <ChatLog
                socket = {socket}
                room = {room}
                playerList = {playerList}
                setPlayerList = {setPlayerList}
                leaveState = {leaveState}
                setLeaveState = {setLeaveState}
            /> : null}
        </>
    )
};

export default ChatArea;
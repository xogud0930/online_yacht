import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatLog from '../../atoms/ChatLog';
import socketio from 'socket.io-client';

const ChatArea = ({
    room,
    roomList,
    setRoomList,
    playerList,
    setPlayerList,
    roomState,
    setRoomState,
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
                roomList = {roomList}
                setRoomList = {setRoomList}
                playerList = {playerList}
                setPlayerList = {setPlayerList}
                roomState = {roomState}
                setRoomState = {setRoomState}
            /> : null}
        </>
    )
};

export default ChatArea;
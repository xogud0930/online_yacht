import React, { useCallback, useEffect, useState } from 'react';
import ChatArea from '../../molecules/ChatArea';
import List from '../../molecules/List';
import Loading from '../../atoms/Loading';
import "./Lobby.css"

const Lobby = (props) => {
    const { roomList, setRoomList, playerList, setPlayerList } = props;
    const name = window.sessionStorage.getItem('userName');
    const [roomState, setRoomState] = useState('');

    const joinRoom = (id) => {
        props.history.push("/room/" + id);
    }

    const onClickLeave = () => {
        setRoomState('lobby-leave');
    }

    const onClickCreateRoom = () => {
        setRoomState('room-add');
    }

    useEffect(() => {
        if(roomState === 'leave') {
            props.history.push('/');
        } else if (roomState === 'room-join') {
            props.history.push("/lobby");
        }
    }, [roomState])

    return (
        <div className = 'yht-lobby'>
            <div id = 'header'>
                <span id = 'create-room'>
                    <button
                        onClick = {() => onClickCreateRoom()}
                    >
                        Create Room
                    </button>
                </span>
                <span id = 'title' className = "subtitle">Online Yacht</span>
                <span id = 'lobby-leave'>
                    <button
                        onClick = {() => onClickLeave()}
                    >
                        Leave
                    </button>
                </span>
            </div>
            <div id = 'wrap'>
                <div id = 'roomlist'>
                    <div id = 'title'>
                        <span>{roomList.length}</span>
                        <div>Room List</div>
                    </div>
                    <List
                        lists = {roomList}
                        type = 'room'
                        joinRoom = {joinRoom}
                    />
                </div>
                <ChatArea
                    room = 'lobby'
                    rommList = {roomList}
                    setRoomList = {setRoomList}
                    playerList = {playerList}
                    setPlayerList = {setPlayerList}
                    roomState = {roomState}
                    setRoomState = {setRoomState}
                />
                <div id = 'playerlist'>
                    <div id = 'title'>
                        <span>{playerList !== '' ? playerList.length : 0}</span>
                        <div>Player List</div>
                    </div>
                    <List
                        lists = {playerList}
                        type = 'player'
                    />
                </div>
            </div>

            <Loading timer = {500}/>
        </div>
    )
}

export default Lobby
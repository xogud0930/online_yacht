import React, { useCallback, useEffect, useState } from 'react';
import ChatArea from '../../molecules/ChatArea';
import List from '../../molecules/List';
import Loading from '../../atoms/Loading';
import "./Lobby.css"

const Lobby = (props) => {
    const { roomList, playerList, setPlayerList } = props;
    const name = window.sessionStorage.getItem('userName');
    const [leaveState, setLeaveState] = useState('');

    const joinRoom = (id) => {
        props.history.push("/room/" + id);
    }

    const onClickLeave = () => {
        setLeaveState({name: name, room: 'lobby'});
    }

    useEffect(() => {
        if(leaveState === 'leave') {
            props.history.push('/');
        }
    }, [leaveState])

    return (
        <div className = 'yht-lobby'>
            <div id = 'header'>
                <span></span>
                <span id = 'title'>Online Yacht</span>
                <span id = 'button'>
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
                    playerList = {playerList}
                    setPlayerList = {setPlayerList}
                    leaveState = {leaveState}
                    setLeaveState = {setLeaveState}
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
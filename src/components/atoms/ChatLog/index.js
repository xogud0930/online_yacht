import React, { useCallback, useEffect, useState } from 'react';
import "./ChatLog.css";

const ChatArea = ({
    socket,
    room,
    playerList,
    setPlayerList,
    leaveState,
    setLeaveState,
}) => {
    const name = window.sessionStorage.getItem('userName');

    const [chatMsg, setChatMsg] = useState({
        type: '',
        name: name,
        message: '',
        time: '',
        room: room,
    })
    const [chatLog, setChatLog] = useState('')
    const [recentChat, setRecentChat] = useState('');
    const [recentList, setRecentList] = useState('');

    const handleChange = (e) => {
        const { value, name } = e.target;
        setChatMsg({
            ...chatMsg,
            [name]: value,
        });
    };

    const onSend = async () => {
        if(chatMsg.message !== '') {
            socket.emit('chat-msg', {
                type: 'none',
                name: chatMsg.name,
                message: chatMsg.message,
                time: getTime(),
                room: chatMsg.room,
            });
            setChatMsg({...chatMsg, message: ''});
        }
    }

    const onKeyPress = (e) => {
        if(e.key == 'Enter') {
            onSend();
        }
    }

    const scrollToBottom = () => {
        document.getElementById('list').scrollBy({ top: 100 });
    };

    const joinRoom = () => {
        console.log(`${name} ${room} join`)

        socket.emit('room-join', chatMsg);
    }

    useEffect(() => {
        console.log('upload')
        socket.on('chat-upload', (msg) => {
            console.log(msg.room, msg.name)
            setRecentChat({
                type: msg.type,
                name: msg.name,
                message: msg.message,
                time: msg.time,
            });
        })

        socket.on('chat-list', (list) => {
            console.log('res: ', list)
            setPlayerList(list);
        })

        socket.on('chat-join', (msg) => {
            setRecentChat({
                type: msg.type,
                name: msg.name,
                message: msg.message,
                time: msg.time,
            });
            
            var findName = playerList !== '' &&
                playerList.find((list) => {
                    console.log('name :', list.name)
                    console.log('msgname :', msg.name)
                    if(list.name === msg.name) return true;
                })

            if(findName) {
                console.log(findName);
            }
            else {
                setRecentList({name: msg.name, id: msg.id, room: msg.room})
            }
        })
    }, [])

    useEffect(() => {
        joinRoom();
    }, [])

    useEffect(() => {
        if(leaveState !== '' && leaveState !== 'leave') {
            socket.emit('chat-leave', chatMsg);
            var templist = {...playerList};
            var findName = playerList !== '' &&
                playerList.find((list) => {
                    console.log('name :', list.name)
                    console.log('msgname :', leaveState.name)
                    if(list.name === leaveState.name) {
                        return true;
                    }
                })

            setLeaveState('leave');
        }
    }, [leaveState])

    useEffect(async () => {
        if(await recentChat.message?.length > 0)
            setChatLog([...chatLog, recentChat]);
        
        scrollToBottom();
        setRecentChat('');
    }, [recentChat])

    useEffect(() => {
        if(recentList !== '') {
            console.log('rl', recentList)
            socket.emit('chat-list', {room: chatMsg.room, list: [...playerList, recentList]});
            setRecentList('');
        }
    }, [recentList])

    const getTime = () => {
        let today = new Date();
    
        const addZero = (n) => {
            return n >= 10 ? n : '0' + n;
        }

        const year = (n) => {
            return String(n)[2] + String(n)[3]
        }
        
        let time = {
            year: year(today.getFullYear()),
            month: addZero(today.getMonth()),
            date: addZero(today.getDate()),
            hours: addZero(today.getHours()),
            minutes: addZero(today.getMinutes()),
            seconds: addZero(today.getSeconds()),
        };
        
        return(`${time.year}/${time.month}/${time.date}+${time.hours}:${time.minutes}:${time.seconds}`)
    }

    return (
        <div className = "yht-chatarea">
            <div id = "area">
                <div id = "list">
                    { chatLog !== '' ?
                    chatLog.map((log, idx) => (
                        <div>
                            {log.type !== 'SYSTEM' ?
                                <>
                                    <span id = "time">&#91;{log.time}&#93;</span>
                                    <span> {log.name} : {log.message}</span>
                                </> :
                                <>
                                    <span id = 'system'>&#60;SYSTEM&#62; {log.message}</span>
                                </>
                            }
                            
                        </div>
                    )) : null}
                </div>
                <div id = "input">
                    <div>Message</div>
                    <span>
                        {name} : 
                        <input
                            name = 'message'
                            value = {chatMsg.message}
                            onKeyUp = {(e) => onKeyPress(e)}
                            onChange = {handleChange}
                            autocomplete = 'off'
                        >
                        </input>
                        <button
                            onClick = {() => onSend()}
                        >
                            Send
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
};

export default ChatArea;
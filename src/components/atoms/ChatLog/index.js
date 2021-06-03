import React, { useEffect, useState } from 'react';
import "./ChatLog.css";

const ChatArea = ({
    socket,
    room,
    roomList,
    setRoomList,
    playerList,
    setPlayerList,
    roomState,
    setRoomState,
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
                type: 'CHAT',
                name: chatMsg.name,
                message: chatMsg.message,
                time: getTime(),
                room: chatMsg.room,
            });
            setChatMsg({...chatMsg, message: ''});
        }
    }

    const onKeyPress = (e) => {
        if(e.key === 'Enter') {
            onSend();
        }
    }

    const scrollToBottom = () => {
        document.getElementById('list').scrollBy({ top: 100 });
    };

    const joinRoom = () => {
        console.log(`${name} ${room} join`)

        if(room === 'lobby')
            socket.emit('lobby-join', chatMsg);
        else {
            socket.emit('room-join', chatMsg);
        }
    }

    useEffect(() => {
        socket.on('chat-upload', (msg) => {
            console.log(msg.room, room, msg.name, msg.message)

            if(room === msg.room) {
                setRecentChat({
                    type: msg.type,
                    name: msg.name,
                    message: msg.message,
                    time: msg.time,
                });
            }
        })

        socket.on('player-list', (list) => {
            console.log('res: ', list)

            list.sort((a, b) => {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            });
            list.sort((a, b) => {
                let x = a.state.toLowerCase();
                let y = b.state.toLowerCase();
                if (x < y) {
                    return 1;
                }
                if (x > y) {
                    return -1;
                }
                return 0;
            });
            

            setPlayerList(list);
        })

        socket.on('player-join', (msg) => {

            if(room === msg.room) {
                setRecentChat({
                    type: msg.type,
                    name: msg.name,
                    message: msg.message,
                    id: msg.id,
                    time: msg.time,
                });
            }

            socket.emit('player-list', msg)
        })

        socket.on('room-list', (list) => {
            console.log('resRoomList: ', list)
            setRoomList(list);
        })
    }, [])

    useEffect(() => {
        joinRoom();

        return() => {
            socket.close();
        }
    }, [])

    useEffect(() => {
        console.log('roomState:', roomState)
        if(roomState !== '' && roomState === 'room-add') {
            socket.emit('room-add');

            setRoomState('room-join');
        } else if(roomState !== '' && (roomState === 'lobby-leave' | roomState === 'room-leave')) {
            socket.emit(roomState, chatMsg);

            setRoomState('leave');
        }
    }, [roomState])

    useEffect(async () => {
        if(await recentChat.message?.length > 0 && recentChat.type !== 'NONE')
            setChatLog([...chatLog, recentChat]);
        
        scrollToBottom();
        setRecentChat('');
    }, [recentChat])

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
                        <div key = {'message-'+idx}>
                            {log.type === 'CHAT' ?
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
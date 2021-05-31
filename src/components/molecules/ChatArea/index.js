import React, { useCallback, useEffect, useState } from 'react';
import "./ChatArea.css"

import socketio from 'socket.io-client'
const socket = socketio.connect('http://localhost:6050')

const ChatArea = () => {
    const name = window.sessionStorage.getItem('userName');

    const [chatMsg, setChatMsg] = useState({
        name: name,
        message: '',
    })
    const [chatLog, setChatLog] = useState('')
    const [recentChat, setRecenChat] = useState('');

    const handleChange = (e) => {
        const { value, name } = e.target;
        setChatMsg({
            ...chatMsg,
            [name]: value,
        });
    };

    const onSend = () => {
        if(chatMsg.message !== '') {
            socket.emit('chat-msg', {
                name: chatMsg.name,
                message: chatMsg.message,
                time: getTime(),
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

    useEffect(() => {
        socket.on('chat-upload', (msg) => {
            setRecenChat({
                name: msg.name,
                message: msg.message,
                time: msg.time,
            });
        })
    }, [])

    useEffect(async () => {
        if(await recentChat.message?.length > 0)
            setChatLog([...chatLog, recentChat]);
        
        scrollToBottom();
        setRecenChat('');
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
                        <div>
                            <span id = "time">&#91;{log.time}&#93;</span>
                            <span> {log.name} : {log.message}</span>
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
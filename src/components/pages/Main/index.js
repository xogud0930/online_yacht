import React, { useCallback, useEffect, useState } from 'react';
import { FaHandLizard } from 'react-icons/fa';
import "./Main.css"

const Main = (props) => {
    const { socket, playerList } = props;
    const [name, setName] = useState('');
    const [nameState, setNameState] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setName(value);
    };

    const onClickButton = () => {
        setNameState('');
        if(name !== '') {
            socket.emit('name-check', name)
        } else {
            setNameState('empty');
        }
    }
    
    const onKeyPress = (e) => {
        if(e.key == 'Enter') {
            onClickButton();
        }
    }

    useEffect(() => {
        console.log(window.sessionStorage.getItem("userName"));
        window.sessionStorage.setItem("userName", '')

        socket.on('name-check', (name) => {
            console.log(name)
            if(name) {
                window.sessionStorage.setItem("userName", name);
                props.history.push("/lobby");
            } else {
                setNameState('overlap');
            }
        })
    }, [])

    return (
        <div className = "yht-main">
            <div id = "title" className = "maintitle">
                Online&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;
                Yacht
            </div>
            <div id = "input">
                <input
                    name = "name"
                    onChange = {handleChange}
                    value = {name}
                    onKeyPress = {(e) => onKeyPress(e)}
                    placeholder = "Enter your name"
                    autocomplete = 'off'
                >
                </input>
                {nameState === 'overlap' ?
                    <span>Name is already in use.</span> :
                    nameState === 'empty' ?
                    <span>Name is empty.</span> : <span>&nbsp;</span>
                }
                
            </div>
            <button
                onClick = {() => onClickButton()}
            >
                Play Game
            </button>
        </div>
    )
}

export default Main;
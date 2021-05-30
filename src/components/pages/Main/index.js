import React, { useCallback, useEffect, useState } from 'react';
import { FaHandLizard } from 'react-icons/fa';
import "./Main.css"

const Main = (props) => {
    const [name, setName] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setName(value);
    };

    const onClickButton = () => {
        if(name !== '') {
            window.sessionStorage.setItem("userName", name);
            props.history.push("/room");
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
    }, [])

    return (
        <div className = "yht-main">
            <div id = "title">
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
            </div>
            <div>
                <button
                    onClick = {() => onClickButton()}
                >
                    Play Game
                </button>
            </div>
        </div>
    )
}

export default Main;
import React, { useCallback, useEffect, useState } from 'react';
import ChatArea from '../../molecules/ChatArea';
import "./Lobby.css"

const Lobby = () => {
    return (
        <div className = 'yht-lobby'>
            <div id = 'header'>
                <span></span>
                <span id = 'title'>Online Yacht</span>
                <span id = 'button'>
                    <button>
                        Leave
                    </button>
                </span>
            </div>
            <div id = 'wrap'>
                <div id = 'roomlist'>
                    <div id = 'title'>
                        <span>10</span>
                        <div>Room List</div>
                    </div>
                </div>
                <ChatArea />
                <div id = 'playerlist'>
                    <div id = 'title'>
                        <span>10</span>
                        <div>Player List</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lobby
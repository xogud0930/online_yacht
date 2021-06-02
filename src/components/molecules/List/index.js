import React, { useCallback, useEffect, useState } from 'react';
import { BsCircleFill } from 'react-icons/bs'
import Room from '../../pages/Room';
import "./List.css"

const List = ({
    lists,
    type,
    joinRoom,
}) => {


    return (
        <div className = 'yht-list'>
            { lists.length > 0 ?
            lists.map((list, idx) => (
                <>
                    { type === 'room' ?
                        <button
                            className = 'room'
                            onClick = {() => joinRoom(list.id)}
                        >
                            <span>
                            Room {list.id + 1} <p>&#40; {list.player} / 8 &#41;</p>
                            </span>
                            <BsCircleFill className = {list.state}/>
                        </button> :
                        <button
                            className = 'player'
                        >
                            <p id = 'state'><BsCircleFill className = {list.state}/></p>
                            <span>{list.name}</span>
                            <p>{list.state === 'off' ? `Game in Room ${Number(list.room) + 1}` : ""}</p>
                        </button>
                    }
                </>)) : null}
        </div>
    )
}

export default List;
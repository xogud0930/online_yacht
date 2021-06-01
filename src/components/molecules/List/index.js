import React, { useCallback, useEffect, useState } from 'react';
import { BsCircleFill } from 'react-icons/bs'
import Room from '../../pages/Room';
import "./List.css"

const List = ({
    lists = ['test'],
    type = 'room',
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
                            onClick = {() => joinRoom(idx)}
                        >
                            <span>
                            Room {idx + 1} <span>&#40; {list.player} / 8 &#41;</span>
                            </span>
                            <BsCircleFill className = {list.state}/>
                        </button> :
                        <button
                            className = 'player'
                        >
                            <p><BsCircleFill className = 'on'/></p>
                            <span>{list.name}</span>
                        </button>
                    }
                </>)) : null}
        </div>
    )
}

export default List;
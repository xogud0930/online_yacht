import React, { useEffect, useState } from 'react';
import DiceArea from '../../molecules/DiceArea';
import ScoreTable from '../../molecules/ScoreBoard';
import ChatArea from '../../atoms/ChatArea';
import Loading from '../../atoms/Loading';
import "./Room.css"
import { useDispatch, useSelector } from 'react-redux';

const user = {
    Name: "",
    Ones: 0,
    Twos: 0,
    Threes: 0,
    Fours: 0,
    Fives: 0,
    Sixes: 0,
    Sum: 0,
    Bonus: 0,
    Choice: 0,
    "4 of a Kind": 0,
    "Full House": 0,
    "Small Straight": 0,
    "Large Straight": 0,
    Yacht: 0,
    Total: 0,
    Check : {
        Ones: false,
        Twos: false,
        Threes: false,
        Fours: false,
        Fives: false,
        Sixes: false,
        Choice: false,
        Sum: true,
        Bonus: true,
        "4 of a Kind": false,
        "Full House": false,
        "Small Straight": false,
        "Large Straight": false,
        Yacht: false,
        Total: true,
    }
}

const Room = (props) => {
    const { socket, roomList, setRoomList, playerList, setPlayerList } = props;
    const { params } = props.match;
    const name = window.sessionStorage.getItem('userName');
    const [chance, setChance] = useState(3);
    const [round, setRound] = useState(1);
    const [currTurn, setCurrTurn] = useState(0);
    const [countUser, setCountUser] = useState(0);
    const [roomState, setRoomState] = useState('');
    const [rollState, setRollState] = useState(true);
    const [yachtRanks, setYachtRanks] = useState({
        0:{ ...user, Name: name },
        1:{ ...user, Name: 'tester' },
        2:{ ...user },
        3:{ ...user },
        4:{ ...user },
        5:{ ...user },
        6:{ ...user },
        7:{ ...user },
    });

    const onClickLeave = () => {
        setRoomState('room-leave');
    }

    useEffect(() => {
        var temp = {...yachtRanks};
        
        Object.values(temp).map((item, idx) => {
            console.log(item.Name)
        })
    }, [countUser])

    useEffect(() => {
        console.log('param', roomList, params.id)
        if(roomList[params.id]) {
            setCountUser(roomList[params.id].player);
        }
    }, [roomList[params.id]])

    useEffect(() => {
        if(roomState === 'leave') {
            props.history.push('/lobby');
        }
    }, [roomState])

    return (
        <div className = "yht-room">
            <div id = "table">
                <DiceArea
                    countUser = {countUser}
                    chance = {chance}
                    setChance = {setChance}
                    round = {round}
                    setRound = {setRound}
                    yachtRanks = {yachtRanks}
                    setYachtRanks = {setYachtRanks}
                    currTurn = {currTurn}
                    setCurrTurn = {setCurrTurn}
                    rollState = {rollState}
                    setRollState = {setRollState}
                />
                <ScoreTable
                    countUser = {countUser}
                    chance = {chance}
                    setChance = {setChance}
                    currTurn = {currTurn}
                    setCurrTurn = {setCurrTurn}
                    round = {round}
                    setRound = {setRound}
                    yachtRanks = {yachtRanks}
                    setYachtRanks = {setYachtRanks}
                    rollState = {rollState}
                />
            </div>
            <div id = "chat">
                <div id = "header">
                    <div id = "roomnum">Room {Number(params.id) + 1}</div>
                    <div id = "player">&#40;Player {countUser} / 8&#41;</div>
                    <button
                        onClick = {() => onClickLeave()}
                    >Leave</button>
                </div>
                <ChatArea
                    socket = {socket}
                    room = {params.id}
                    roomList = {roomList}
                    setRoomList = {setRoomList}
                    playerList = {playerList}
                    setPlayerList = {setPlayerList}
                    roomState = {roomState}
                    setRoomState = {setRoomState}
                />
            </div>

            <Loading timer = {500}/>
        </div>
    )
}

export default Room;
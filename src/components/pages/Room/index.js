import React, { useCallback, useEffect, useState } from 'react';
import DiceArea from '../../molecules/DiceArea';
import ScoreTable from '../../molecules/ScoreBoard';
import ChatArea from '../../molecules/ChatArea';
import Loading from '../../atoms/Loading';
import "./Room.css"

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
    const { roomList, playerList, setPlayerList } = props;
    const { params } = props.match;
    const name = window.sessionStorage.getItem('userName');
    const [diceArray, setDiceArray] = useState(["", "", "", "", ""]);
    const [diceKeep, setDiceKeep] = useState([false, false, false, false, false]);
    const [chance, setChance] = useState(3);
    const [round, setRound] = useState(1);
    const [currTurn, setCurrTurn] = useState(0);
    const [countUser, setCountUser] = useState(0);
    const [leaveState, setLeaveState] = useState('');
    const [rollState, setRollState] = useState(true);
    const [yachtRanks, setYachtRanks] = useState({
        0:{ ...user, Name: name },
        1:{ ...user, Name: "MaeGunBoong" },
        2:{ ...user },
        3:{ ...user },
        4:{ ...user },
        5:{ ...user },
        6:{ ...user },
        7:{ ...user },
    });
    
    const updateCountUser = () => {
        var n = 0;
        Object.values(yachtRanks).map((user, idx) => {
            if(user.Name != "") n++;
        })
        setCountUser(n);
    };

    const onClickLeave = () => {
        setLeaveState({name: name, room: params.id});
    }

    useEffect(() => {
        console.log("start")
        updateCountUser();
        console.log("CC", countUser, chance)
    }, [])

    useEffect(() => {
        if(leaveState === 'leave') {
            props.history.push('/lobby');
        }
    }, [leaveState])

    return (
        <div className = "yht-room">
            <div id = "table">
                <DiceArea
                    countUser = {countUser}
                    chance = {chance}
                    setChance = {setChance}
                    round = {round}
                    setRound = {setRound}
                    diceArray = {diceArray}
                    setDiceArray = {setDiceArray}
                    yachtRanks = {yachtRanks}
                    setYachtRanks = {setYachtRanks}
                    currTurn = {currTurn}
                    setCurrTurn = {setCurrTurn}
                    diceKeep = {diceKeep}
                    setDiceKeep = {setDiceKeep}
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
                    diceArray = {diceArray}
                    setDiceArray = {setDiceArray}
                    setDiceKeep = {setDiceKeep}
                    rollState = {rollState}
                />
            </div>
            <div id = "chat">
                <div id = "header">
                    <div id = "player">Player {countUser} / 8</div>
                    <button
                        onClick = {() => onClickLeave()}
                    >Leave</button>
                </div>
                <ChatArea
                    room = {params.id}
                    playerList = {playerList}
                    setPlayerList = {setPlayerList}
                    leaveState = {leaveState}
                    setLeaveState = {setLeaveState}
                />
            </div>

            <Loading timer = {500}/>
        </div>
    )
}

export default Room;
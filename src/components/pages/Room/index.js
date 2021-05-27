import React, { useCallback, useEffect, useState } from 'react';
import DiceArea from '../../molecules/DiceArea';
import ScoreTable from '../../molecules/ScoreBoard';

const Room = () => {
    const [diceArray, setDiceArray] = useState([6, 6, 6, 6, 6]);
    const [diceKeep, setDiceKeep] = useState([false, false, false, false, false]);
    const [chance, setChance] = useState(3);
    const [currTurn, setCurrTurn] = useState(0);
    const [yachtRanks, setYachtRanks] = useState({
    0:{
        Name: "User1",
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
    },
    1:{
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
    },
    2:{
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
    },
    3:{
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
    },
    4:{
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
    },
    5:{
        Name: "",
        Ones: 0,
        Twos: 0,
        Threes: 0,
        Fours: 0,
        Fives: "",
        Sixes: "",
        Sum: "",
        Bonus: "",
        Choice: "",
        "4 of a Kind": "",
        "Full House": "",
        "Small Straight": "",
        "Large Straight": "",
        Yacht: "",
        Total: "", 
    }}) 

    return (
        <div>
            <DiceArea
                chance = {chance}
                diceArray = {diceArray}
                diceKeep = {diceKeep}
                yachtRanks = {yachtRanks}
                currTurn = {currTurn}
                setChance = {setChance}
                setDiceArray = {setDiceArray}
                setDiceKeep = {setDiceKeep}
                setYachtRanks = {setYachtRanks}
            />
            <ScoreTable
                currTurn = {currTurn}
                chance = {chance}
                yachtRanks = {yachtRanks}
            />
        </div>
    )
}

export default Room;
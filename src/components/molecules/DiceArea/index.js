import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YachtCal from '../../atoms/YachtCal';
import Dice from '../../atoms/Dice';
import "./DiceArea.css"

import { setDice, setKeepState } from '../../redux/modules/dice'

const DiceArea = ({
    countUser,
    chance,
    setChance,
    round,
    setRound,
    yachtRanks,
    setYachtRanks,
    currTurn,
    setCurrTurn,
    rollState,
    setRollState,
}) => {
    const dispatch = useDispatch();
    const diceArray = useSelector(state => state.dice.array)
    const diceKeep = useSelector(state => state.dice.keepState)

    const onClickDice = (idx) => {
        if(chance != 3 & rollState) {
            const arr = [...diceKeep];
            if(diceArray[idx] != 0)
                arr[idx] = !arr[idx];
            dispatch(setKeepState(arr));
        }
    }

    const onClickButton = async () => {
        if(chance != 0) {
            setRollState(false);
            var interval = setInterval(changeDice, 100);
            setTimeout(() => {
                setRollState(true);
                clearInterval(interval);
                setChance(chance != 0 ? chance - 1 : 0)
            }, 1000)
        }
    }

    const changeDice = () => {
        var dices = [...diceArray];

        for (const idx in diceArray) {
            if(!diceKeep[idx]) {
                dices[idx] = Math.floor(Math.random() * 6) + 1
            }
        }

        dispatch(setDice(dices));
    }

    const nextTurn = () => {
        var turn = currTurn;
        setCurrTurn( ++turn >= countUser ? nextRound() : turn );
    }

    const nextRound = () => {
        var r = round;
        setRound( ++r > 12 ? 0 : r );
        return 0;
    }

    return (
        <div className = 'yht-dicearea'>
            <div key = 'turn' id="turn">
                {round} / 12 round<br/><br/>
                <span>{yachtRanks[currTurn]["Name"]}<br/></span>
                Turn<br/>
                {chance} / 3
            </div>
            <div key = 'dices' id="dices">
                <div key = 'dicesarray'>
                    {diceArray.map((dice, idx) => (
                        <Dice
                            id = {idx}
                            onClick = {() => onClickDice(idx)}
                            isSelected = {diceKeep[idx]} 
                            num = {dice}
                        />
                    ))}
                </div>
                <div id="buttons">
                    <button
                        onClick = {() => onClickButton()}
                    >
                        Roll
                    </button>
                </div>
            </div>
            <YachtCal
                currTurn = {currTurn}
                chance = {chance}
                countUser = {countUser}
                yachtRanks = {yachtRanks}
                setYachtRanks = {setYachtRanks}
            />
        </div>
    )
};

export default DiceArea
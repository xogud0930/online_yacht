import React, { useCallback, useEffect, useState } from 'react';
import YachtCal from '../../atoms/YachtCal';
import Dice from '../../atoms/Dice';
import "./DiceArea.css"

const DiceArea = ({
    countUser,
    chance,
    setChance,
    round,
    setRound,
    diceArray = [6, 6, 6, 6, 6],
    setDiceArray,
    diceKeep = [0, 0, 0, 0, 0],
    setDiceKeep,
    yachtRanks,
    setYachtRanks,
    currTurn,
    setCurrTurn,
    rollState,
    setRollState,
}) => {
    const onClickDice = (idx) => {
        if(chance != 3 & rollState) {
            const arr = [...diceKeep];
            if(diceArray[idx] != "")
                arr[idx] = !arr[idx];
            setDiceKeep(arr);
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

        setDiceArray(dices)
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
            <div id="turn">
                {round} / 12 round<br/><br/>
                <span>{yachtRanks[currTurn]["Name"]}<br/></span>
                Turn<br/>
                {chance} / 3
            </div>
            <div id="dices">
                <div>
                    {diceArray.map((dice, idx) => (
                        <Dice
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
                diceArray = {diceArray}
                yachtRanks = {yachtRanks}
                setYachtRanks = {setYachtRanks}
            />
        </div>
    )
};

export default DiceArea
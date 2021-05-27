import React, { useCallback, useEffect, useState } from 'react';
import YachtCal from '../../atoms/YachtCal';
import Dice from '../../atoms/Dice';
import "./DiceArea.css"

const DiceArea = ({
    chance,
    diceArray = [6, 6, 6, 6, 6],
    diceKeep = [0, 0, 0, 0, 0],
    yachtRanks,
    currTurn,
    setChance,
    setDiceArray,
    setDiceKeep,
    setYachtRanks,
}) => {
    const onClickDice = (idx) => {
        const arr = [...diceKeep];
        arr[idx] = !arr[idx];
        setDiceKeep(arr);
    }

    const onClickButton = async () => {
        if(chance != 0) {
            var interval = setInterval(changeDice, 100);
            setTimeout(() => {
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

    const checkDice = () => {
        setChance(3);
        console.log(diceArray);
    }

    return (
        <div className = 'yht-dicearea'>
            <div id="turn">
                {yachtRanks[currTurn]["Name"]}<br/>
                Turn
            </div>
            <div id="dices">
                <div>
                    {diceArray.map((dice, idx) => (
                        <Dice
                            idx = {idx}
                            onClick = {() => onClickDice(idx)}
                            isSelected = {diceKeep[idx]} 
                            style = {{fontSize: '80px', cursor: 'pointer', minHeight: "10px", margin: "10px"}}
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
                    <button
                        onClick = {() => checkDice()}
                    >
                        Check
                    </button>
                </div>
            </div>
            <YachtCal
                currTurn = {currTurn}
                chance = {chance}
                diceArray = {diceArray}
                yachtRanks = {yachtRanks}
                setYachtRanks = {setYachtRanks}
            />
        </div>
    )
};

export default DiceArea
import React, { useCallback, useEffect } from 'react';
import Dice from '../../atoms/Dice';

const DiceArea = ({
    diceArray = [6, 6, 6, 6, 6],
    diceKeep = [0, 0, 0, 0, 0],
    setDiceArray,
    setDiceKeep,
}) => {
    const sleep = (ms) => {
        return new Promise((r) => setTimeout(r, ms));
    }
    const onClickDice = (idx) => {
        const arr = [...diceKeep];
        arr[idx] = !arr[idx];
        setDiceKeep(arr);
    }

    const setTest = useCallback((arr) => {
        setDiceArray(arr)
    })

    const onClickButton = async () => {
        var dices = [...diceArray];

        for (const i in diceArray) {
            for (const idx in diceArray) {
                if(!diceKeep[idx]) {
                    dices[idx] = Math.floor(Math.random() * 6) + 1
                }
                console.log(i, dices)
                setTest(dices)
            }
            await sleep(300).then(() => setTest(dices))
        }

        console.log(dices)

        setTest(dices)
    }

    useEffect(() => {
        console.log("dice", diceArray)
    }, [diceArray])

    return (
        <div className = 'yht-dicearea'>
            <div>
                {diceArray.map((dice, idx) => (
                    <Dice
                        idx = {idx}
                        onClick = {() => onClickDice(idx)}
                        isSelected = {diceKeep[idx]} 
                        style = {{fontSize: '100px', cursor: 'pointer', minHeight: "10px"}}
                        num = {dice}
                    />
                ))}
            </div>
            <button
                onClick = {() => onClickButton()}
            >
                Roll
            </button>
        </div>
    )
};

export default DiceArea
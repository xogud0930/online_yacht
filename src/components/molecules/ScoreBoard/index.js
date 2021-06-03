import React, { useEffect } from 'react';
import "./ScoreTable.css";

const ScoreTable = ({
    countUser,
    chance,
    setChance,
    currTurn,
    setCurrTurn,
    round,
    setRound,
    yachtRanks,
    setYachtRanks,
    diceArray,
    setDiceArray,
    setDiceKeep,
    rollState,
}) => {
    const onClickPoint = (user, key) => {
        if(!yachtRanks[user]["Check"][key] & chance != 3 & rollState) {
            setYachtRanks({
                ...yachtRanks,
                [user]: {
                    ...yachtRanks[user],
                    "Check": {
                        ...yachtRanks[user]["Check"],
                        [key]:true
                    }
                }
            });
            setChance(3);
            nextTurn();
            setDiceArray(["", "", "", "", ""])
            setDiceKeep([false, false, false, false, false])
            console.log(diceArray);
        }
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

    var upCat = ["Ones", "Twos", "Threes", "Fours", "Fives", "Sixes"];
    var sumKey = ["Bonus", "Choice", "4 of a Kind", "Full House", "Small Straight", "Large Straight", "Yacht"];
    var sumDice = () => {
        var lastTrun = currTurn
        console.log("C", countUser)
        lastTrun = --lastTrun < 0 ? countUser-1 : lastTrun
        console.log("L", lastTrun, currTurn)

        var sum = 0;
        for(var cat of upCat) {
            if(yachtRanks[lastTrun]["Check"][cat]) {
                sum += yachtRanks[lastTrun][cat];
            }
        }

        var total = sum;
        for(var key of sumKey) {
            if(yachtRanks[lastTrun]["Check"][key]) {
                total += yachtRanks[lastTrun][key];
            }
        }

        setYachtRanks({
            ...yachtRanks,
            [lastTrun]: {
                ...yachtRanks[lastTrun],
                Sum: sum,
                Bonus: sum >= 63 ? 35 : 0,
                Total: total,
            }
        });
        console.log(yachtRanks)
    }

    useEffect(() => {
        if(countUser != 0)
            sumDice();
    }, [yachtRanks[currTurn]["Check"], currTurn])

    return (
        <div className = "yht-scoretable">
            <table>
                <thead>
                    <tr id="title">
                        <th>Categories</th>
                        {Object.keys(yachtRanks).map((n) => (
                            <th id = "Name" className = {n == currTurn ? "this" : ""}>
                                <span>{yachtRanks[n]["Name"]}</span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(yachtRanks[0]).map((key, idx) => (
                        <>
                            { 
                            (key != "Name" && key != "Check") ?
                            <tr id = {key}>
                                <th>{key}</th>
                                {Object.keys(yachtRanks).map((n) => (
                                    <td>
                                        {yachtRanks[n]["Name"] !== "" ?
                                        <button
                                            id = {key}
                                            className = {"check-" + yachtRanks[n]["Check"][key] + (currTurn != n ? " disabled" : "") + (yachtRanks[n][key] === 0 ? " zero" : "")}
                                            onClick = {() => onClickPoint(n, key)}
                                        >
                                            { chance !== 3 | yachtRanks[n]["Check"][key] ? yachtRanks[n][key] : <span>&nbsp;</span>}
                                            {key === "Sum" ? " /63" : null}
                                        </button> : null}
                                    </td>
                                ))}
                            </tr> : null }
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ScoreTable
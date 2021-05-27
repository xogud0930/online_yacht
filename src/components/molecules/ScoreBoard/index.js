import React, { useEffect } from 'react';
import "./ScoreTable.css"

const ScoreTable = ({
    currTurn,
    chance,
    yachtRanks,
}) => {
    const count = [ 0, 1, 2, 3, 4, 5 ]

    return (
        <div className = "yht-scoretable">
            <table>
                <thead>
                    <tr id="title">
                        <th>Categories</th>
                        {count.map(($, n) => (
                            <th id="Name">{yachtRanks[n]["Name"]}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(yachtRanks[0]).map((key, idx) => (
                        <>
                            { 
                            key != "Name" ?
                            <tr id = {key}>
                                <th>{key}</th>
                                {count.map(($, n) => (
                                    <td>
                                        {yachtRanks[n]["Name"] !== "" ?
                                        <button
                                            id={key}
                                        >
                                            {yachtRanks[n][key]}{key === "Sum" ? " / 63" : null}
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
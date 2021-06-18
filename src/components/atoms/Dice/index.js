import React from 'react';
import { FaSquare } from "react-icons/fa"
import { CgDice1, CgDice2, CgDice3, CgDice4, CgDice5, CgDice6  } from "react-icons/cg";
import "./Dice.css"

const diceIcon = {
    0: <FaSquare />,
    1: <CgDice1 />,
    2: <CgDice2 />,
    3: <CgDice3 />,
    4: <CgDice4 />,
    5: <CgDice5 />,
    6: <CgDice6 />,
};

const Dice = ({
    id,
    onClick,
    isSelected,
    num,
}) => {

    return (
        <span key = {'dice-'+id} className = "yht-dice" style={{display: 'inline-block'}}>
            <div
                className = {(num === ""  ? "disabled" : "active") + (isSelected ? " isSelected" : "")}
                onClick = {onClick}
            >
                {diceIcon[num]}
            </div>
            <span>
                {num != 0 ? num : ''}
            </span>
        </span>
    )
};

export default Dice;

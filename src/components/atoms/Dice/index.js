import { CgDice1, CgDice2, CgDice3, CgDice4, CgDice5, CgDice6  } from "react-icons/cg";
import React from 'react';

const diceIcon = {
    1: <CgDice1 />,
    2: <CgDice2 />,
    3: <CgDice3 />,
    4: <CgDice4 />,
    5: <CgDice5 />,
    6: <CgDice6 />,
};

const selectStyle = {
    color: "red"
}

const Dice = ({
    idx,
    onClick,
    isSelected,
    style,
    num = 6,
}) => {
    style = {...style,
        display: 'inline-block',
        cursor: 'pointer',
        height: '0px',
    }
    return (
        <span style={{display: 'inline-block'}}>
            <div
                id = {"dice"+idx}
                onClick = {onClick}
                style = {isSelected ? {...selectStyle, ...style} : {...style}}
            >
                {diceIcon[num]}
            </div>
            <div style={{textAlign: 'center'}}>
                {num}
            </div>
        </span>
    )
};

export default Dice;

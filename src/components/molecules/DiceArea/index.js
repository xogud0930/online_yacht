import React, { useCallback } from 'react';
import Dice from '../../atoms/Dice';

const DiceArea = ({
    diceArray = [6, 6, 6, 6, 6],
    diceSelected = [0, 0, 0, 0, 0],
    setSelected,
}) => {
    var selectedArray = {...diceSelected}
    const onClickDice = (idx) => (
        diceSelected[idx] != diceSelected[idx]
    );
    
    console.log(diceSelected)

    return (
        <div className='yht-dicearea'>
            {diceArray.map((dice, idx) => (
                <Dice
                    onClick={(idx) => onClickDice(idx)}
                    isSelected={diceSelected[idx]} 
                    style={{fontSize: '30px', cursor: 'pointer'}}
                    num={dice}
                />
            ))}
        </div>
    )
};

export default DiceArea
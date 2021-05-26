import React, { useState } from 'react';
import DiceArea from "../molecules/DiceArea"

const App = () => {
  const [diceArray, setDiceArray] = useState([6, 6, 6, 6, 6]);
  const [diceKeep, setDiceKeep] = useState([false, false, false, false, false]);

  return (
    <div className="App">
      <DiceArea
        diceArray = {diceArray}
        diceKeep = {diceKeep}
        setDiceArray = {setDiceArray}
        setDiceKeep = {setDiceKeep}
      />
    </div>
  );
}

export default App;

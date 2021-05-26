import DiceArea from "../molecules/DiceArea"


const App = () => {
  const diceSelected

  return (
    <div className="App">
      HelloWorld
      <DiceArea
        diceArray={[1, 2, 3, 4, 5]}
        diceSelected={[0, 0, 1, 1, 0]}
      />
    </div>
  );
}

export default App;

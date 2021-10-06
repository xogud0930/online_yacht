import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const YachtCal = ({
    currTurn,
    chance,
    yachtRanks,
    setYachtRanks,
}) => {
    const diceArray = useSelector(state => state.dice.array);
    
    const pointCal = () => {
        var tempDice = [...new Set(diceArray)];

        tempDice.sort((a, b) => {
            return a - b;
        });

        var combineDice = tempDice.reduce((dice, curr) => {
            return String(dice) + String(curr) 
        })

        var duplicationDice = diceArray.reduce((dice, curr) => {
            if(curr != "")
                dice[curr] = (dice[curr] || 0) + 1;
            return dice;
        }, {})

        var sumDice = diceArray.reduce((sum, curr) => {
            return sum + curr;
        }, 0);

        var fullHouseCheck = Object.keys(duplicationDice).reduce((sum, curr) => {
            return duplicationDice[curr] === 2 | duplicationDice[curr] === 3 | duplicationDice[curr] === 5 ? sum + duplicationDice[curr] : sum
        }, 0);

        console.log(duplicationDice)

        setYachtRanks({
            ...yachtRanks,
            [currTurn]:{
                ...yachtRanks[currTurn],
                Ones: checkSelect(numSum(1), "Ones"),
                Twos: checkSelect(numSum(2), "Twos"),
                Threes: checkSelect(numSum(3), "Threes"),
                Fours: checkSelect(numSum(4), "Fours"),
                Fives: checkSelect(numSum(5), "Fives"),
                Sixes: checkSelect(numSum(6), "Sixes"),
                Choice: checkSelect(sumDice, "Choice"),
                "4 of a Kind": checkSelect(Object.keys(duplicationDice).reduce((sum, curr) => {
                    return duplicationDice[curr] >= 4 ? sum + sumDice : sum
                }, 0), "4 of a Kind"),
                "Full House": checkSelect((fullHouseCheck === 5 ? sumDice : 0), "Full House"),
                "Small Straight": checkSelect((String(combineDice).match(/1234|2345|3456/) != null ? 15 : 0), "Small Straight"),
                "Large Straight": checkSelect((String(combineDice).match(/12345|23456/) != null ? 30 : 0), "Large Straight"),
                Yacht: checkSelect(Object.keys(duplicationDice).reduce((sum, curr) => {
                    return duplicationDice[curr] === 5 ? 50 : 0
                }, 0), "Yacht"),
        }})
    };

    const numSum = (n) => {
        return diceArray.reduce((sum, curr) => {
            return curr === n ? sum + curr : sum;
        }, 0)
    }

    const checkSelect = (func, key) => {
        if(!yachtRanks[currTurn]["Check"][key]) return func;
        else return yachtRanks[currTurn][key];
    }

    useEffect(() => {
        console.log(yachtRanks)
        console.log(diceArray)
        pointCal();
        console.log(yachtRanks)
    }, [chance]);

    return (
        <>
        </>
    )
}

export default YachtCal


/*
Ones
1이 나온 주사위 눈의 총합. 최대 5점.
40px-Dice-1 svg40px-Dice-1 svg40px-Dice-1 svg40px-Dice-5 svg40px-Dice-6a svg = 3점
Twos[2]
2가 나온 주사위 눈의 총합. 최대 10점.
40px-Dice-2 svg40px-Dice-2 svg40px-Dice-2 svg40px-Dice-5 svg40px-Dice-6a svg = 6점
Threes
3이 나온 주사위 눈의 총합. 최대 15점.
40px-Dice-3 svg40px-Dice-3 svg40px-Dice-3 svg40px-Dice-5 svg40px-Dice-6a svg = 9점
Fours
4가 나온 주사위 눈의 총합. 최대 20점.
40px-Dice-1 svg40px-Dice-2 svg40px-Dice-4 svg40px-Dice-4 svg40px-Dice-4 svg = 12점
Fives
5가 나온 주사위 눈의 총합. 최대 25점.
40px-Dice-1 svg40px-Dice-2 svg40px-Dice-5 svg40px-Dice-5 svg40px-Dice-5 svg = 15점
Sixes
6이 나온 주사위 눈의 총합. 최대 30점.
40px-Dice-1 svg40px-Dice-2 svg40px-Dice-6a svg40px-Dice-6a svg40px-Dice-6a svg = 18점
이름
설명
예시
Choice
주사위 눈 5개의 총합. 최대 30점.
40px-Dice-3 svg40px-Dice-4 svg40px-Dice-5 svg40px-Dice-6a svg40px-Dice-6a svg = 24점
4 of a Kind
동일한 주사위 눈이 4개일 때, 해당 주사위 눈 4개의 총합. 최대 24점.
40px-Dice-5 svg40px-Dice-6a svg40px-Dice-6a svg40px-Dice-6a svg40px-Dice-6a svg = 24점
Full House
동일한 주사위 눈이 각각 3개, 2개일 때, 주사위 눈 5개의 총합. 최대 30점[3].
40px-Dice-5 svg40px-Dice-5 svg40px-Dice-6a svg40px-Dice-6a svg40px-Dice-6a svg = 28점
Little Straight
주사위 눈이 각각 1, 2, 3, 4, 5일 때. 고정 30점.
40px-Dice-1 svg40px-Dice-2 svg40px-Dice-3 svg40px-Dice-4 svg40px-Dice-5 svg = 30점
Big Straight
주사위 눈이 각각 2, 3, 4, 5, 6일 때. 고정 30점.
40px-Dice-2 svg40px-Dice-3 svg40px-Dice-4 svg40px-Dice-5 svg40px-Dice-6a svg = 30점
Yacht
*/
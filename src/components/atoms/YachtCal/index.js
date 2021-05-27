import React, { useEffect } from 'react';
import "./YachtCal.css"

const YachtCal = ({
    currTurn,
    chance,
    diceArray,
    yachtRanks,
    setYachtRanks,
}) => {
    const pointCal = () => {
        var tempDice = [...new Set(diceArray)]
        tempDice.sort((a, b) => {
            return a - b;
        });

        var combineDice = tempDice.reduce((dice, curr) => {
            return String(dice) + String(curr) 
        })

        var duplicationDice = diceArray.reduce((dice, curr) => {
            dice[curr] = (dice[curr] || 0) + 1;
            return dice;
        }, {})

        var sumDice = diceArray.reduce((sum, curr) => {
            return sum + curr;
        }, 0);

        var fullHouseCheck = Object.keys(duplicationDice).reduce((sum, curr) => {
            return duplicationDice[curr] === 2 | duplicationDice[curr] === 3 | duplicationDice[curr] === 5 ? sum + duplicationDice[curr] : sum
        }, 0);

        setYachtRanks({
            ...yachtRanks,
            [currTurn]:{
                ...yachtRanks[currTurn],
                Ones: diceArray.reduce((sum, curr) => {
                    return curr === 1 ? sum + curr : sum;
                }, 0),
                Twos: diceArray.reduce((sum, curr) => {
                    return curr === 2 ? sum + curr : sum;
                }, 0),
                Threes: diceArray.reduce((sum, curr) => {
                    return curr === 3 ? sum + curr : sum;
                }, 0),
                Fours: diceArray.reduce((sum, curr) => {
                    return curr === 4 ? sum + curr : sum;
                }, 0),
                Fives: diceArray.reduce((sum, curr) => {
                    return curr === 5 ? sum + curr : sum;
                }, 0),
                Sixes: diceArray.reduce((sum, curr) => {
                    return curr === 6 ? sum + curr : sum;
                }, 0),
                Choice: sumDice,
                "4 of a Kind": Object.keys(duplicationDice).reduce((sum, curr) => {
                    return duplicationDice[curr] === 4 ? sumDice : 0
                }, 0),
                "Full House": fullHouseCheck === 5 ? sumDice : 0,
                "Small Straight": String(combineDice).match(/1234|2345|3456/) != null ? 15 : 0,
                "Large Straight": String(combineDice).match(/12345|23456/) != null ? 30 : 0,
                Yacht: Object.keys(duplicationDice).reduce((sum, curr) => {
                    return duplicationDice[curr] === 5 ? 50 : 0
                }, 0),
        }})
    };

    useEffect(() => {
        console.log(yachtRanks)
        console.log(diceArray)
        pointCal();
    }, [chance]);

    return (
        <div>
        </div>
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
import React, { useEffect, useState } from 'react';
import Player from './Player';
import Result from './Result';

export default function App() {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [winner, setWinner] = useState(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    const playGame = (choice) => {
        // コンピュータの選択（ランダムにじゃんけんの手を選択）
        const choices = ['rock', 'paper', 'scissors'];
        const computerPick = choices[Math.floor(Math.random() * 3)];
        setComputerChoice(computerPick);

        // プレイヤーの選択を設定
        setPlayerChoice(choice);

        // 勝者を決定
        if ((choice === 'rock' && computerPick === 'scissors') ||
            (choice === 'scissors' && computerPick === 'paper') ||
            (choice === 'paper' && computerPick === 'rock')) {
            setWinner('player');
        } else if (choice === computerPick) {
            setWinner('draw');
        } else {
            setWinner('computer');
        }
    };

    useEffect(() => {
        console.log("Computer Choice:", computerChoice);
        console.log("Is Player Turn:", isPlayerTurn);

        if (!computerChoice) {
            setIsPlayerTurn(false); // コンピュータの選択がまだならプレイヤーのターンではない
        } else {
            setIsPlayerTurn(true);  // コンピュータの選択が完了したらプレイヤーのターンへ移行
        }
    }, [computerChoice]);

    return (
        <div className="App">
            <h1>後出しじゃんけんゲーム</h1>
            {isPlayerTurn ? <Player playGame={playGame} /> : <p>Computer's Choice: {computerChoice}</p>}
            {winner && <Result winner={winner} playerChoice={playerChoice} computerChoice={computerChoice} />}
        </div>
    );
}

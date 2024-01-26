import React, { useState, useEffect } from 'react';

const App = () => {
  const [computerChoice, setComputerChoice] = useState(null);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);

  useEffect(() => {
    const makeComputerMove = () => {
      // コンピューターの手をランダムに選択
      const choices = ['rock', 'paper', 'scissors'];
      const randomIndex = Math.floor(Math.random() * choices.length);
      const computerHand = choices[randomIndex];
      setComputerChoice(computerHand);

      // プレイヤーのターンに切り替える
      setIsPlayerTurn(true);
    };

    if (!isPlayerTurn) {
      // 1秒後にコンピューターの手を出す
      const timeoutId = setTimeout(makeComputerMove, 1000);

      // Clean up関数を追加
      return () => clearTimeout(timeoutId);
    }
  }, [isPlayerTurn]);

  const handlePlayerChoice = (choice) => {
    if (isPlayerTurn) {
      // プレイヤーの手を設定
      setPlayerChoice(choice);

      // 勝敗判定
      determineResult(choice, computerChoice);
      setIsPlayerTurn(false); // コンピューターのターンに移行
    }
  };

  const determineResult = (playerHand, computerHand) => {
    // 勝敗判定
    if (playerHand === computerHand) {
      setResult('Draw!');
    } else if (
      (playerHand === 'rock' && computerHand === 'scissors') ||
      (playerHand === 'paper' && computerHand === 'rock') ||
      (playerHand === 'scissors' && computerHand === 'paper')
    ) {
      setResult('You win!');
    } else {
      setResult('You lose!');
    }
  };

  return (
    <div>
      <h1>Rock Paper Scissors</h1>
      <p>Computer's choice: {computerChoice}</p>
      <p>Your choice: {playerChoice}</p>
      <p>Result: {result}</p>

      {isPlayerTurn ? (
        <>
          <button onClick={() => handlePlayerChoice('rock')}>Rock</button>
          <button onClick={() => handlePlayerChoice('paper')}>Paper</button>
          <button onClick={() => handlePlayerChoice('scissors')}>Scissors</button>
        </>
      ) : (
        <p>Waiting for computer...</p>
      )}
    </div>
  );
};

export default App;
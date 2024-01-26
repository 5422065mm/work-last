import React, { useState } from 'react';

const ResultScreen = ({ playerWins, draws, playerLosses }) => (
  <div>
    <h2>Result</h2>
    <p>Player Wins: {playerWins}</p>
    <p>Draws: {draws}</p>
    <p>Player Losses: {playerLosses}</p>
    <h2>Try again !!!</h2>
  </div>
);

const App = () => {
  const [computerChoice, setComputerChoice] = useState(null);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [playerWins, setPlayerWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [playerLosses, setPlayerLosses] = useState(0);

  const makeComputerMove = () => {
    // コンピューターの手をランダムに選択
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerHand = choices[randomIndex];
    setComputerChoice(computerHand);

    // プレイヤーのターンに切り替える
    setResult(null); // Reset the result for a new round
  };

  const handlePlayerChoice = (choice) => {
    // プレイヤーの手を設定
    setPlayerChoice(choice);

    // 勝敗判定
    determineResult(choice, computerChoice);
  };

  const determineResult = (playerHand, computerHand) => {
    // 勝敗判定
    if (playerHand === computerHand) {
      setResult('Draw!');
      setDraws((prevDraws) => prevDraws + 1);
    } else if (
      (playerHand === 'rock' && computerHand === 'scissors') ||
      (playerHand === 'paper' && computerHand === 'rock') ||
      (playerHand === 'scissors' && computerHand === 'paper')
    ) {
      setResult('You win!');
      setPlayerWins((prevWins) => prevWins + 1);
    } else {
      setResult('You lose!');
      setPlayerLosses((prevLosses) => prevLosses + 1);
    }

    // Make a new move after a brief delay
    setTimeout(() => {
      if (playerWins >= 10) {
        // If player wins 10 or more times, navigate to result screen
        setPlayerWins(0); // Reset win count for a new game
      } else {
        makeComputerMove();
      }
    }, 1000);
  };

  return (
    <div>
      {playerWins >= 10 ? (
        <ResultScreen playerWins={playerWins} draws={draws} playerLosses={playerLosses} />
      ) : (
        <>
          <h1>Rock Paper Scissors</h1>
          <p>Computer's choice: {computerChoice}</p>
          <p>Your choice: {playerChoice}</p>
          <p>Result: {result}</p>

          <button onClick={() => handlePlayerChoice('rock')}>Rock</button>
          <button onClick={() => handlePlayerChoice('paper')}>Paper</button>
          <button onClick={() => handlePlayerChoice('scissors')}>Scissors</button>

          <div>
            <p>Player Wins: {playerWins}</p>
            <p>Draws: {draws}</p>
            <p>Player Losses: {playerLosses}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
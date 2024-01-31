import React, { useState, useEffect } from 'react';

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
  const [qrCode, setQrCode] = useState("");


  useEffect(() => {
    // 最初のラウンドでコンピューターの手をすぐに表示する処理
    makeComputerMove();
  }, []);


  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const text = "https://portal.educ.chs.nihon-u.ac.jp/";
        const size = 80;
        const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=${size}x${size}`);
        // 生成したQRコードをセット
        setQrCode(response.url); // setQrCodeが定義されていないためコメントアウト
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQrCode();
  }, []);

  const makeComputerMove = () => {
    // コンピューターの手をランダムに選択
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerHand = choices[randomIndex];
    setComputerChoice(computerHand);

    // プレイヤーのターンに切り替える
    setResult(null); // 新しいラウンドのために結果をリセット
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

    // 新しい手をセットする（遅延させる）
    setTimeout(() => {
      if (playerWins >= 10) {
        // プレイヤーが10回以上勝った場合、結果画面に遷移
        setPlayerWins(0); // 新しいゲームのために勝利回数をリセット
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
      <div className="qrcode">
        {qrCode && <img src={qrCode} alt="作成者" />}
      </div>
    </div>
    
  );
};

export default App;

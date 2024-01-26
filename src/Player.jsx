import React from 'react';

function Player({ playGame }) {
  return (
    <div className="Player-buttons">
      <button onClick={() => playGame('rock')}>Rock</button>
      <button onClick={() => playGame('paper')}>Paper</button>
      <button onClick={() => playGame('scissors')}>Scissors</button>
    </div>
  );
}


/*function Player({ playGame }) {
  return (
      <div className="Player-buttons">
          <button onClick={() => playGame('rock')} disabled={!isPlayerTurn}>Rock</button>
          <button onClick={() => playGame('paper')} disabled={!isPlayerTurn}>Paper</button>
          <button onClick={() => playGame('scissors')} disabled={!isPlayerTurn}>Scissors</button>
      </div>
  );
}*/

export default Player;

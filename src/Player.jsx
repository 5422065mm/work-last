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

export default Player;

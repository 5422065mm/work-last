import React from 'react';

function Result({ winner, playerChoice, computerChoice }) {
  return (
    <div className="Result">
      <h2>{winner === 'draw' ? 'Draw!' : `Winner: ${winner === 'player' ? 'Player' : 'Computer'}`}</h2>
      <p>Player: {playerChoice}</p>
      <p>Computer: {computerChoice}</p>
    </div>
  );
}

export default Result;

import React, { useReducer } from 'react';
import Board from './Board';
const reducer = (state, action) => {
  switch (action.type) {
    case 'MOVE':
      return {
        ...state,
        history: state.history.concat({ squares: action.payload.squares }),
        xIsNext: !state.xIsNext,
      };

    case 'JUMP':
      return {
        ...state,
        history: state.historyslice(0, action.payload.step + 1),
        xIsNext: action.payload.step % 2 === 0,
      };
    default:
      return state;
  }
};

export default function Game() {
  const [state, dispatch] = useReducer(reducer, {
    xIsNext: true,
    history: [{ squares: Array(9).fill(null) }],
  });
  const { xIsNext, history } = state;
  const jumpTo = (step) => {
    dispatch({ type: 'JUMP', payload: { step } });
  };
  const handleClick = (i) => {
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    dispatch({ type: 'MOVE', payload: { squares } });
  };
  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);
  const status = winner
    ? winner === 'D'
      ? 'Draw'
      : 'Winner is ' + winner
    : 'Next player is ' + (xIsNext ? 'X' : 'O');
  const moves = history.map((step, move) => {
    const desc = move ? 'Go to #' + move : 'Start the game ';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board
          onClick={(i) => handleClick(i)}
          squares={current.squares}
        ></Board>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>{moves}</div>
      </div>
    </div>
  );
}

const calculateWinner = (squares) => {
  const winerLiunes = [[0, 1, 2], [3, 4, 5], []];
};

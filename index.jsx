const { useState } = React;



export function Board() {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [moves, setMoves] = useState(0);

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWinner = (board) => {
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);

    const win = checkWinner(newSquares);
    if (win) {
      setWinner(win);
    } else if (moves + 1 === 9) {
      setWinner("Draw");
    } else {
      setIsXNext(!isXNext);
    }

    setMoves(moves + 1);
  };

  const resetGame = () => {
    setSquares(initialSquares);
    setIsXNext(true);
    setWinner(null);
    setMoves(0);
  };

  return (
    <div>
      <div className="board" style={{ display: "grid", gridTemplateColumns: "repeat(3, 60px)" }}>
        {squares.map((value, idx) => (
          <button
            key={idx}
            className="square"
            onClick={() => handleClick(idx)}
          >
            {value}
          </button>
        ))}
      </div>

      {winner && (
        <p>
          {winner === "Draw"
            ? "It's a draw!"
            : `Winner: ${winner}`}
        </p>
      )}

      <button id="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}



      
   

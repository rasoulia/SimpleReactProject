import { useState } from "react";
import "./tic-tac-toe.css"

interface SquareProps {
    squareContent: string;
    squareIndex: number;
    winClass: number[];
    onSquareClick: (value: number) => void;
}

interface BoardProps {
    xIsNext: boolean;
    squares: string[];
    onPlay: (nextSquares: string[]) => void;
}
function calculateWinner(squares: string[]): number[] | null {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }

    return null;
}

function Square(props: SquareProps) {
    return (
        <button
            className={`square ${props.winClass.includes(props.squareIndex) ? 'win' : ''}`}
            onClick={() => props.onSquareClick(props.squareIndex)}>
            {props.squareContent}
        </button>
    )
}

function Board(props: BoardProps) {
    function handleClick(i: number) {
        if (calculateWinner(props.squares) || props.squares[i]) {
            return;
        }

        const nextSquares = props.squares.slice();
        nextSquares[i] = props.xIsNext ? 'X' : 'O';

        props.onPlay(nextSquares);
    }

    const winner = calculateWinner(props.squares);
    const status =
        winner
            ? `Winner: ${props.xIsNext ? 'O' : 'X'}`
            : (
                props.squares.some(w => w === null)
                    ? `Next player: ${props.xIsNext ? 'X' : 'O'}`
                    : 'Draw'
            );

    return (
        <div className="board-container">
            <span>{status}</span>
            <div className="board">
                <Square squareContent={props.squares[0]} onSquareClick={handleClick} squareIndex={0} winClass={winner ?? []} />
                <Square squareContent={props.squares[1]} onSquareClick={handleClick} squareIndex={1} winClass={winner ?? []} />
                <Square squareContent={props.squares[2]} onSquareClick={handleClick} squareIndex={2} winClass={winner ?? []} />
                <Square squareContent={props.squares[3]} onSquareClick={handleClick} squareIndex={3} winClass={winner ?? []} />
                <Square squareContent={props.squares[4]} onSquareClick={handleClick} squareIndex={4} winClass={winner ?? []} />
                <Square squareContent={props.squares[5]} onSquareClick={handleClick} squareIndex={5} winClass={winner ?? []} />
                <Square squareContent={props.squares[6]} onSquareClick={handleClick} squareIndex={6} winClass={winner ?? []} />
                <Square squareContent={props.squares[7]} onSquareClick={handleClick} squareIndex={7} winClass={winner ?? []} />
                <Square squareContent={props.squares[8]} onSquareClick={handleClick} squareIndex={8} winClass={winner ?? []} />
            </div>
        </div>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares: string[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: any) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((_, move) => {
        const description =
            move > 0
                ?
                (
                    currentMove == move
                        ? `You are at move #${move}`
                        : `Go to move #${move}`
                )
                : 'Go to game start';

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)} className={currentMove === move ? "content" : ""}>{description}</button>
            </li>
        );
    });

    return (
        <div className="container">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            <ul className="move-list">
                {moves}
            </ul>
        </div>
    )
}

function App() {
    //constants
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];


    //app's state variables
    const [board, setBoard] = React.useState(["", "", "", "", "", "", "", "", ""])
    const [turn, setTurn] = React.useState('X')
    const [win, setWin] = React.useState()
    const [gameOver, setGameOver] = React.useState(false);

    function handleTurn(event) {
        console.log(event.target, event.target.id)
        let idx = event.target.id
        if (gameOver == false) {
            let newBoard = [...board]
            newBoard[idx] = turn
            setBoard(newBoard)
            setTurn(turn === 'X' ? 'O' : 'X')
            getWinner(newBoard);
        }
    }
    function Message() {
        let msg = gameOver ?
            win != 'T' ? `${win} wins!` : `That's a tie, queen!`
            : `It's ${turn}'s turn!`;
        return <h1>{msg}</h1>
    }
    function getWinner(newBoard) {
        for (const combo of winningCombos) {
            const [first, second, third] = combo;
            if (newBoard[first] && newBoard[first] === newBoard[second] && newBoard[first] === newBoard[third]) {
                setWin(newBoard[first]);
                setGameOver(true);
            }
        }
        if (newBoard.every(square => square !== "")) {
            setWin('T');
            setGameOver(true);
        }
    }

    return (
        <div>
            <h1>Tic-React-Toe</h1>
            <Message />
            <div class="flex-container flex-column">
                <div className="flex-container flex-wrap" id="board" onClick={handleTurn}>
                    {board.map((value, idx) => {
                        return (<div class="square" key={idx} id={idx}>{value}</div>
                        );
                    })}
                </div>
                <button id="reset-button" onClick={event => { setBoard(["", "", "", "", "", "", "", "", ""]); setWin(null); setTurn('X'); setGameOver(false) }}>reset</button>
            </div>
        </div>
    );
}

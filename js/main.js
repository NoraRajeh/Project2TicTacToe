

//cached element references
const squares = Array.from(document.querySelectorAll('#board div'));


//event listeners
document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);

//functions
function init() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    render();
}
function render() {
    board.forEach(function (mark, index) {
        // console.log(mark, index);
        squares[index].textContent = mark;
    });
    // messages.textContent = `It's ${turn}'s turn!`;
    messages.textContent = win === 'T' ? `That's a tie, queen!` : win ?
        `${win} wins the game!` : `It's ${turn}'s turn!`;
};
function handleTurn(event) {
    let idx = squares.findIndex(function (square) {
        return square === event.target;
    });
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    render();
    //console.log(board);
}
function getWinner() {
    let winner = null;
    winningCombos.forEach(function (combo, index) {
        if (board[combo[0]] && board[combo[0]] ===
            board[combo[1]] && board[combo[0]] ===
            board[combo[2]]) winner = board[combo[0]];
    });
    return winner ? winner : board.includes('') ? null : 'T';

}
init();
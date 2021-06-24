// check if any character is repeated 4 times in a row
function checkRow(row) {
    // replace empty characters with the character e
    const rowWithoutSpaces = row.map(el => el === '' ? 'e' : el)
    const string = rowWithoutSpaces.join('');
    return /([0-9])\1{3}/.test(string);
}

export default (board, position) => {
    // transform the column to a row
    const column = board.map((row) => row[position.x]);

    // transform the diagonals to a row and then pass them to the checkRow function
    const diagonal1 = board.map((row, index) => row[position.x + index - position.y]);
    const diagonal2 = board.map((row, index) => row[position.x - index + position.y]);

    console.log(board[position.y], column, diagonal2, diagonal1)
    return checkRow(board[position.y])
        || checkRow(column)
        || checkRow(diagonal1)
        || checkRow(diagonal2);
};

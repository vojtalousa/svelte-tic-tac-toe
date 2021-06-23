<script>
    import Square from './components/Square.svelte';
    import Cursor from "./components/Cursor.svelte";
    import checkWin from "./scripts/checkWin";

    let squares = Array(25 * 25).fill('')
    let nextRound = 1
    let players = 0

    // split an array to equal chunks
    function chunkArray(myArray, chunkSize) {
        const results = [];
        while (myArray.length) {
            results.push(myArray.splice(0, chunkSize));
        }
        return results;
    }

    function clickSquare(index) {
        if (squares[index] === '') {
            socket.emit('place', { index, piece: nextRound })
            if (nextRound >= 4) nextRound = 1
            else nextRound += 1

            const modifiedSquares = chunkArray(squares.slice(), 25) // convert squares to a 2d array
            const clickedSquare = {x: index % 25, y: Math.floor(index / 25)} // convert the index to a x,y coordinate
            if (checkWin(modifiedSquares, clickedSquare)) alert("You win!")
        }
    }

    socket.on('place', ({ index, piece }) => squares[index] = piece)
    socket.on('starterinfo', (board) => squares = board)
</script>

<main>
    <h1>TIC-TAC-TOE</h1>
    <div id="board">
        {#each squares as value, index}
            <Square on:click={() => clickSquare(index)} {value}/>
        {/each}
    </div>
    <div id="cursors">
        <Cursor value={nextRound}/>
    </div>
</main>

<style>
    main {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    #board {
        display: grid;
        grid-template-columns: repeat(25, 25px);
        grid-template-rows: repeat(25, 25px);
    }
</style>

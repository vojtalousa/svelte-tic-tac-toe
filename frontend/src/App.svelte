<script>
    import Square from './components/Square.svelte';
    import Cursor from "./components/Cursor.svelte";
    import checkWin from "./scripts/checkWin";

    let squares = Array(25 * 25).fill('')
    let thisPlayerNextRound = 1
    let players = {}

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
            let nextPiece = Math.floor(Math.random() * 4) + 1
            socket.emit('place', { index, nextPiece, piece: thisPlayerNextRound})
            thisPlayerNextRound = nextPiece

            const modifiedSquares = chunkArray(squares.slice(), 25) // convert squares to a 2d array
            const clickedSquare = {x: index % 25, y: Math.floor(index / 25)} // convert the index to a x,y coordinate
            if (checkWin(modifiedSquares, clickedSquare)) alert("You win!")
        }
    }

    socket.on('place', ({ index, piece, nextPiece, id }) => {
        players[id].nextRound = nextPiece
        squares[index] = piece
    })
    socket.on('starterinfo', ({board, listOfPlayers}) => {
        console.log(listOfPlayers, board)
        players = listOfPlayers
        squares = board
    })
    socket.on('move', ({position, id}) => {
        players[id] = {...players[id], position}
    })

    let timeout = false
    window.addEventListener('mousemove', event => {
      if (!timeout) {
          timeout = true
          socket.emit('move', {x: event.clientX, y: event.clientY})

          // only send the move update every 20ms
          setTimeout(() => timeout = false, 20)
      }
    })
</script>

<main>
    <h1>TIC-TAC-TOE</h1>
    <div id="board">
        {#each squares as value, index}
            <Square on:click={() => clickSquare(index)} {value}/>
        {/each}
    </div>
    <div id="cursors">
        {JSON.stringify(players)}
        {#each Object.keys(players) as id}
            <Cursor position={players[id].position} nextRound={players[id].nextRound}/>
        {/each}
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

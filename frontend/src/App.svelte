<script>
    import Square from './components/Square.svelte';
    import Cursor from "./components/Cursor.svelte";
    import checkWin from "./scripts/checkWin";

    let squares = Array(25 * 25).fill('')
    let thisPlayerNextRound = 1
    let players = {}
    let cooldown = 0
    let winLose

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
            socket.emit('place', {index, nextPiece, piece: thisPlayerNextRound})
            thisPlayerNextRound = nextPiece
        }
    }

    socket.on('place', ({index, piece, nextPiece, id}) => {
        if (players[id].loading >= 81.155) {
            players[id].loading = 0
            players[id].nextRound = nextPiece
            squares[index] = piece

            const modifiedSquares = chunkArray(squares.slice(), 25) // convert squares to a 2d array
            const clickedSquare = {x: index % 25, y: Math.floor(index / 25)} // convert the index to a x,y coordinate
            if (checkWin(modifiedSquares, clickedSquare) && id === socket.id) {
                winLose = 'won'
                socket.emit('win')
                squares = Array(25 * 25).fill('')
                setTimeout(() => winLose = null, 3000)
            }

            // create the loading animation
            let loadingInterval = setInterval(() => {
                players[id].loading += 81.155 / 100
                if (players[id].loading >= 81.155) {
                    clearInterval(loadingInterval)
                }
            }, 10)
        }
    })
    // this is sent to the client when a player joins/leaves
    socket.on('starterinfo', ({board, listOfPlayers}) => {
        console.log(listOfPlayers, board)
        players = listOfPlayers
        squares = board
    })
    socket.on('move', ({position, id}) => {
        players[id] = {...players[id], position}
    })
    socket.on('lost', () => {
        winLose = 'lost'
        squares = Array(25 * 25).fill('')
        setTimeout(() => winLose = null, 3000)
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
    <div class="winPopup" style={`visibility: ${(winLose ? 'visible' : 'hidden')}`}>
        <div>
            <h2>You {winLose}.</h2>
        </div>
    </div>
    <div id="board">
        {#each squares as value, index}
            <Square on:click={() => clickSquare(index)} {value}/>
        {/each}
    </div>
    <div id="cursors">
        {#each Object.keys(players) as id}
            <Cursor position={players[id].position}
                    nextRound={players[id].nextRound}
                    loading={`${players[id].loading} 81.155`}/>
        {/each}
    </div>
</main>

<style lang="scss">
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

    .winPopup {
      z-index: 5;
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
        div {
          background-color: white;
          border-radius: 5px;
          width: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 70px;
        }
    }
</style>

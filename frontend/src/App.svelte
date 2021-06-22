<script>
    import Square from './components/Square.svelte';
    const squares = Array(25 * 25).fill('')
	console.log(squares)
	let nextRound = 1
    function clickSquare(index) {
    	console.log(index, "clicked")
		if (squares[index] === '') {
			squares[index] = nextRound
			if (nextRound >= 4) nextRound = 1
			else nextRound += 1
		}
    }
</script>

<main>
    <h1>TIC-TAC-TOE</h1>
    <div id="board">
        {#each squares as value, index}
            <Square on:click={() => clickSquare(index)} {value}/>
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

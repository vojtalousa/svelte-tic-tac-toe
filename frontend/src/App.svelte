<script>
	import Square from './components/Square.svelte';
	const squares = Array(25 * 25).fill('')
</script>

<main>
	<h1>TIC-TAC-TOE</h1>
	<div id="board">
		{#each squares as _, i}
			<Square />
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

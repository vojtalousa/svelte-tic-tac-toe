<script>
    export let nextRound
    export let position

    import { afterUpdate } from 'svelte';
    import triangle from '../../public/images/triangle.svg';
    import circle from '../../public/images/circle.svg';
    import pentagram from '../../public/images/pentagram.svg';
    import cross from '../../public/images/cross.svg';

    const lookup = {
        1: triangle,
        2: circle,
        3: pentagram,
        4: cross
    }

    let pointer
    afterUpdate(() => {
        pointer.style.left = `${position.x - 12.5}px`
        pointer.style.top = `${position.y - 12.5}px`
    })
</script>

<div bind:this={pointer} class="container">
    {@html lookup[nextRound] || ''}
</div>

<style>
    .container {
        border-radius: 500px;
        background-color: #ffffff;
        border: #ff3e00 1px solid;
        user-select: none;
        pointer-events: none;
        position: absolute;
        width: 25px;
        height: 25px;
    }
</style>

<script>
    export let value

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
    window.addEventListener('mousemove', (event) => {
        console.log(pointer, event)
        pointer.style.left = `${event.clientX - 12.5}px`
        pointer.style.top = `${event.clientY - 12.5}px`
    })
</script>

<div bind:this={pointer} class="container">
    {@html lookup[value] || ''}
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

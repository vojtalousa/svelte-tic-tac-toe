<script>
    export let nextRound
    export let position
    export let loading

    import {afterUpdate} from 'svelte';
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
    let circleSVG
    afterUpdate(() => {
        pointer.style.left = `${position.x - 12.5}px`
        pointer.style.top = `${position.y - 12.5}px`
    })
</script>

<div bind:this={pointer} class="container">

    <div class="piece">
        {@html lookup[nextRound] || ''}
    </div>
    <svg id="outline">
        <circle bind:this={circleSVG} cx="14.5" cy="14.5" r="13" stroke="#ff3e00" stroke-width="2" fill="white"
                stroke-dasharray={loading}/>
    </svg>
</div>

<style lang="scss">
  .container {
    overflow: visible;
    user-select: none;
    pointer-events: none;
    position: absolute;
    width: 25px;
    height: 25px;

    .piece {
      position: absolute;
      top: 1px;
      left: 1px;
      z-index: 2;
      width: 27px;
      height: 27px;
    }

    #outline {
      width: 29px;
      height: 29px;
      position: absolute;
      display: block;
      transform-box: fill-box;
      transform-origin: center;
      transform: rotate(-135deg);
    }
  }
</style>

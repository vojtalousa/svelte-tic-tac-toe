<script>
    export let value

    import triangle from '../../public/images/triangle.svg'
    import circle from '../../public/images/circle.svg'
    import pentagram from '../../public/images/pentagram.svg'
    import cross from '../../public/images/cross.svg'

    const lookup = {
        1: triangle,
        2: circle,
        3: pentagram,
        4: cross
    }
</script>

<div class="square" on:click>
    {@html lookup[value] || ''}
</div>

<style lang="scss">
  .square {
    border: #d7d7d7 solid 1px;
    margin-right: -1px;
    margin-bottom: -1px;

    &:hover {
      background-color: #ff290090;
    }
  }
</style>

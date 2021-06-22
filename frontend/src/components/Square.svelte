<script>
    export let value
</script>

<div on:click class="square">
    {value}
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

<script>
  import { fade } from 'svelte/transition';
</script>

<div class="box" transition:fade>
  <slot />
</div>

<style>
  .box {
    background-color: #ffffff;
    padding: 16px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.04) 0 1px 2px, rgba(0, 0, 0, 0.04) 0 5px 6px,
      rgba(0, 0, 0, 0.1) 0 0 1px;
  }
</style>

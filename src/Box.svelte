<script>
  import { fade } from 'svelte/transition';
  let { children } = $props();
</script>

<div class="box" transition:fade>
  {@render children?.()}
</div>

<style>
  .box {
    background-color: #ffffff;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    border-radius: 0.25rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: inset rgba(0, 0, 0, 0.1) 1px 1px 5px;
  }
</style>

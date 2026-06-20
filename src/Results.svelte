<script>
  import Result from './Result.svelte';

  let { matches } = $props();
</script>

<div class="results-list">
  {#each matches as match (match.address)}
    <Result {...match} />
  {/each}
</div>

<style>
  .results-list {
    border: 1px solid var(--border);
    background: var(--panel);
  }
</style>

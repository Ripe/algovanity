<script>
  import Result from './Result.svelte';

  let { matches } = $props();
</script>

{#each matches as match (match.address)}
  <Result {...match} />
{/each}

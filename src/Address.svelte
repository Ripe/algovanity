<script>
  import ExternalLink from './ExternalLink.svelte';
  export let keyword;
  export let address;
</script>

<ExternalLink href={`https://algoexplorer.io/address/${address}`}>
  <span class="address"
    >{@html address.replace(keyword, `<mark>${keyword}</mark>`)}</span
  >
</ExternalLink>

<style>
  .address {
    font-family: monospace;
    word-break: break-word;
  }
</style>

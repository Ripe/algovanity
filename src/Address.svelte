<script>
  import ExternalLink from './ExternalLink.svelte';
  let { keyword, address } = $props();
</script>

<ExternalLink href={`https://allo.info/account/${address}`}>
  <span class="address">{@html address.replace(keyword, `<mark>${keyword}</mark>`)}</span>
</ExternalLink>

<style>
  .address {
    font-family: monospace;
    word-break: break-word;
  }
</style>

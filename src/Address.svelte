<script>
  import ExternalLink from './ExternalLink.svelte';
  let { keyword, address } = $props();
</script>

<span class="address-link">
  <ExternalLink href={`https://allo.info/account/${address}`}>
    <span class="address">{@html address.replace(keyword, `<mark>${keyword}</mark>`)}</span>
  </ExternalLink>
</span>

<style>
  .address-link :global(a) {
    text-decoration: none;
  }

  .address-link :global(a:hover) {
    text-decoration: underline;
  }

  .address {
    font-family: inherit;
    color: var(--text-addr);
    word-break: break-all;
  }

  .address:hover {
    color: var(--text-white);
  }

  .address :global(mark) {
    background: transparent;
    color: var(--text-white);
    font-weight: 700;
  }
</style>

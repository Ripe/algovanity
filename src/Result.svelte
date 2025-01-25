<script>
  import Box from './Box.svelte';
  import Address from './Address.svelte';
  import Modal from './Modal.svelte';
  import ExternalLink from './ExternalLink.svelte';
  import Button from './Button.svelte';

  let { keyword, address, mnemonic } = $props();
  let show = $state(false);
</script>

<Box>
  <div class="match">
    <div class="address">
      <Address {keyword} {address} />
    </div>
    <Button variant="small" onclick={() => (show = true)}>Reveal Passphrase</Button>
    <Modal bind:show>
      <h3 class="heading">
        Recovery passphrase
        <Button variant="small" onclick={() => navigator.clipboard.writeText(mnemonic)}
          >Copy to Clipboard</Button
        >
      </h3>
      <ol class="passphrase">
        {#each mnemonic.split(' ') as word}
          <li>{word}</li>
        {/each}
      </ol>
      <ExternalLink
        href="https://support.perawallet.app/en/article/recover-an-algorand-account-11gdh1y/"
      >
        Follow these instructions on how to recover an Algorand account using the Pera Mobile
      </ExternalLink>
    </Modal>
  </div>
</Box>

<style>
  .match {
    display: flex;
    flex-direction: column;
  }

  .address {
    margin-bottom: 0.5rem;
  }

  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .passphrase {
    column-count: 2;
    line-height: 1.5;
    padding: 0;
    margin: 0 0 1rem;
    list-style-position: inside;
    font-family: monospace;
  }

  @media (min-width: 960px) {
    .match {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
    }

    .address {
      margin: 0 0.5rem 0 0;
    }
  }
</style>

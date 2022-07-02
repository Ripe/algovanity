<script>
  import Box from './Box.svelte';
  import Address from './Address.svelte';
  import Modal from './Modal.svelte';
  import ExternalLink from './ExternalLink.svelte';
  import Button from './Button';

  export let matches = [];
</script>

{#each matches as match (match.address)}
  <Box>
    <div class="match">
      <div class="address">
        <Address keyword={match.keyword} address={match.address} />
      </div>
      <Modal let:open>
        <Button slot="trigger" variant="small" onClick={open}
          >Reveal Passphrase</Button
        >
        <h3 class="heading">
          Recovery passphrase
          <Button
            variant="small"
            onClick={() => navigator.clipboard.writeText(match.mnemonic)}
            >Copy to Clipboard</Button
          >
        </h3>
        <ol class="passphrase">
          {#each match.mnemonic.split(' ') as word}
            <li>{word}</li>
          {/each}
        </ol>
        <ExternalLink
          href="https://support.perawallet.app/en/article/recover-an-algorand-account-11gdh1y/"
        >
          Follow these instructions on how to recover an Algorand account using
          the official wallet.
        </ExternalLink>
      </Modal>
    </div>
  </Box>
{/each}

<style>
  .match {
    display: flex;
    flex-direction: column;
  }

  .address {
    margin-bottom: 8px;
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
    margin: 0 0 16px;
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
      margin: 0 8px 0 0;
    }
  }
</style>

<script>
  import { fade } from 'svelte/transition';
  import Address from './Address.svelte';
  import Modal from './Modal.svelte';
  import ExternalLink from './ExternalLink.svelte';
  import Button from './Button.svelte';

  let { keyword, address, mnemonic } = $props();
  let show = $state(false);
  let copied = $state(false);
  let mnemonicCopied = $state(false);

  function copy(text, done) {
    navigator.clipboard
      ?.writeText(text)
      .then(() => {
        done(true);
        setTimeout(() => done(false), 1500);
      })
      .catch(() => {});
  }
</script>

{#snippet copyIcon()}
  <svg
    class="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="square"
    aria-hidden="true"
  >
    <path d="M8 8h12v12H8z" />
    <path d="M16 8V4H4v12h4" />
  </svg>
{/snippet}

<div class="result" transition:fade={{ duration: 150 }}>
  <span class="tag">{keyword}</span>
  <span class="addr"><Address {keyword} {address} /></span>
  <span class="acts">
    <button class="act" type="button" onclick={() => copy(address, (v) => (copied = v))}>
      {@render copyIcon()}
      {copied ? 'Copied' : 'Copy'}
    </button>
    <button class="act" type="button" onclick={() => (show = true)}>
      <svg
        class="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="square"
        aria-hidden="true"
      >
        <circle cx="8" cy="15" r="4" />
        <path d="M11 12l9-9M17 6l3 3M13.5 9.5l2.5 2.5" />
      </svg>
      Reveal key
    </button>
  </span>
</div>

<Modal bind:show>
  <h3 class="heading">
    Recovery passphrase
    <Button variant="small" onclick={() => copy(mnemonic, (v) => (mnemonicCopied = v))}>
      {@render copyIcon()}
      {mnemonicCopied ? 'Copied' : 'Copy'}
    </Button>
  </h3>
  <div class="modal-address">
    <span class="modal-label">Address</span>
    <Address {keyword} {address} />
  </div>
  <ol class="passphrase">
    {#each mnemonic.split(' ') as word}
      <li>{word}</li>
    {/each}
  </ol>
  <p class="recovery-link">
    <ExternalLink
      href="https://support.perawallet.app/en/article/recover-an-algorand-account-11gdh1y/"
    >
      Instructions on how to recover an Algorand account using the Pera Mobile
    </ExternalLink>
  </p>
</Modal>

<style>
  .result {
    display: flex;
    gap: 0.75rem;
    border-top: 1px solid var(--border);
    padding: 0.75rem 0.85rem;
    font-size: 0.85rem;
  }

  .result:first-child {
    border-top: none;
  }

  .tag {
    color: var(--text-white);
    font-weight: 700;
    flex: none;
    min-width: 3.2rem;
  }

  .addr {
    flex: 1;
    min-width: 0;
    font-family: monospace;
  }

  .acts {
    margin-left: auto;
    display: flex;
    gap: 0.85rem;
    flex: none;
  }

  .act {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: none;
    border: 0;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .act:hover {
    color: var(--text-white);
  }

  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin: 0 0 1rem;
    color: var(--text-white);
  }

  .modal-address {
    margin: 0 0 1.25rem;
    font-size: 0.85rem;
  }

  .modal-label {
    display: block;
    color: var(--text-faint);
    font-size: 0.65rem;
    text-transform: uppercase;
    margin-bottom: 0.35rem;
  }

  .passphrase {
    column-count: 2;
    line-height: 1.5;
    padding: 0;
    margin: 0 0 1rem;
    list-style-position: inside;
    font-family: inherit;
    color: var(--text-addr);
  }

  .recovery-link {
    margin: 0;
    font-size: 0.85rem;
  }

  .recovery-link :global(a) {
    color: var(--text-muted);
    text-decoration: none;
  }

  .recovery-link :global(a:hover) {
    color: var(--text-white);
    text-decoration: underline;
  }

  @media (max-width: 560px) {
    .result {
      flex-wrap: wrap;
    }

    .acts {
      width: 100%;
      margin-left: 0;
    }
  }
</style>

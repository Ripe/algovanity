<script>
  import Address from './Address.svelte';
  import { TIP_ADDRESS } from './constants';
  import ExternalLink from './ExternalLink.svelte';
</script>

{#snippet chevron()}
  <svg
    class="chev"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.4"
    stroke-linecap="square"
    aria-hidden="true"
  >
    <path d="M5 9l7 7 7-7" />
  </svg>
{/snippet}

<div class="faqs">
  <details class="faq-item">
    <summary>
      {@render chevron()}
      What is a vanity address?
    </summary>
    <div class="answer">
      <p>
        A vanity address is a standard Algorand address that has been customized to include a
        specific keyword or pattern within its identifier. For example:
      </p>
      <p><Address keyword="MONEY" address={TIP_ADDRESS} /></p>
    </div>
  </details>

  <details class="faq-item">
    <summary>
      {@render chevron()}
      How does this tool work?
    </summary>
    <div class="answer">
      <p>
        Addresses are generated randomly and then checked to see if they contain your desired
        keyword. The time it takes to find a matching address can vary based on the length of your
        keyword, ranging from a few seconds to several hours. Once a matching address is found, you
        can reveal its passphrase and import it into your Algorand wallet.
      </p>
    </div>
  </details>

  <details class="faq-item">
    <summary>
      {@render chevron()}
      Is this safe?
    </summary>
    <div class="answer">
      <p>Yes and no.</p>
      <p>
        Yes, because your address and passphrase are never transmitted over the network, and the
        address generation is performed locally using the official Algorand SDK. Additionally, the
        code is open-source, meaning anyone can inspect it to verify its safety and transparency.
        You can also optionally rekey the address to ensure that only you have the ability to use
        it.
      </p>
      <p>
        No, because it's never entirely safe to use online tools for generating addresses or
        managing private keys. Even with precautions, online environments can introduce risks. For
        maximum security, always use trusted, offline tools and devices to protect your sensitive
        information.
      </p>
      <p>
        <ExternalLink
          href="https://support.perawallet.app/en/article/how-to-rekey-an-algorand-account-with-pera-mobile-13ykjxs/"
        >
          How to rekey Algorand account with Pera Mobile
        </ExternalLink>
      </p>
    </div>
  </details>
</div>

<style>
  .faqs {
    border: 1px solid var(--border);
    background: var(--panel);
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .faq-item {
    padding: 0.85rem;
  }

  .faq-item + .faq-item {
    border-top: 1px solid var(--border);
  }

  summary {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    cursor: pointer;
    list-style: none;
    color: var(--text);
  }

  summary::-webkit-details-marker {
    display: none;
  }

  .chev {
    width: 13px;
    height: 13px;
    flex: none;
    color: var(--text-faint);
    transition: transform 0.15s ease;
  }

  .faq-item[open] .chev {
    transform: rotate(180deg);
  }

  .answer {
    padding: 0.75rem 0 0 calc(13px + 0.85rem);
    color: var(--text-muted);
  }

  .answer p {
    margin: 0 0 0.6rem;
  }

  .answer p:last-child {
    margin-bottom: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .chev {
      transition: none;
    }
  }
</style>

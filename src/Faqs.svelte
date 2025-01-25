<script>
  import Address from './Address.svelte';
  import { TIP_ADDRESS } from './constants';
  import ExternalLink from './ExternalLink.svelte';
</script>

<div class="question">
  <h3>What is a vanity address?</h3>
  <p>
    A vanity address is a standard Algorand address that has been customized to include a specific
    keyword or pattern within its identifier. For example:
  </p>
  <p>
    <Address keyword="MONEY" address={TIP_ADDRESS} />
  </p>
</div>
<div class="question">
  <h3>How does this tool work?</h3>
  <p>
    Addresses are generated randomly and then checked to see if they contain your desired keyword.
    The time it takes to find a matching address can vary based on the length of your keyword,
    ranging from a few seconds to several hours. Once a matching address is found, you can reveal
    its passphrase and import it into your Algorand wallet.
  </p>
</div>
<div class="question">
  <h3>Is this safe?</h3>
  <p>Yes and no.</p>
  <p>
    Yes, because your address and passphrase are never transmitted over the network, and the address
    generation is performed locally using the official Algorand SDK. Additionally, the code is
    open-source, meaning anyone can inspect it to verify its safety and transparency. You can also
    optionally rekey the address to ensure that only you have the ability to use it.
  </p>
  <p>
    No, because it's never entirely safe to use online tools for generating addresses or managing
    private keys. Even with precautions, online environments can introduce risks. For maximum
    security, always use trusted, offline tools and devices to protect your sensitive information.
  </p>
  <p>
    <ExternalLink
      href="https://support.perawallet.app/en/article/how-to-rekey-an-algorand-account-with-pera-mobile-13ykjxs/"
    >
      How to rekey Algorand account with Pera Mobile
    </ExternalLink>
  </p>
</div>

<style>
  p {
    margin-bottom: 1rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  .question + .question {
    margin-top: 2rem;
  }
</style>

<script>
  import Address from './Address.svelte';
  import { TIP_ADDRESS } from './constants';
  import ExternalLink from './ExternalLink.svelte';
</script>

<h2>FAQs</h2>
<div class="question">
  <h3>What is a vanity address?</h3>
  <p>
    A vanity address is just a regular Algorand address but you've chosen to
    include a specific keyword somewhere in the identifier. e.g.
  </p>
  <p>
    <Address keyword="MONEY" address={TIP_ADDRESS} />
  </p>
  <p>
    Once you've picked an address you can use it for sending and receiving <strong
      >ALGO</strong
    >!
  </p>
</div>
<div class="question">
  <h3>How does this tool work?</h3>
  <p>
    Addresses are randomly generated and checked for a match against your
    keyword. Depending on the length of your keyword, the process may take a few
    seconds or a few hours. You can reveal the passphrase on any matching
    address to add it to your own Algorand wallet.
  </p>
</div>
<div class="question">
  <h3>Is this safe?</h3>
  <p>
    Yes, your address and passphrase are never transmitted over the network and
    the address generation is done with the official Algorand SDK. Optionally,
    after choosing an address you're able to rekey it to ensure no one has the
    ability to use the address except you.
  </p>
  <p>
    <ExternalLink
      href="https://www.algorand.com/resources/blog/rekeying-with-ledger-nano-x-tutorial"
    >
      How to rekey to a Ledger Nano X device
    </ExternalLink>
  </p>
</div>

<style>
  p {
    margin-bottom: 16px;
  }

  p:last-child {
    margin-bottom: 0;
  }

  .question + .question {
    margin-top: 32px;
  }
</style>

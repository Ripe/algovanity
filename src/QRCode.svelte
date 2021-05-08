<script>
  import QRCode from 'qrcode';

  export let text;
  export let width;
  export let height;
</script>

{#await QRCode.toDataURL(text, { margin: 0, width, height }) then value}
  <img src={value} alt="" />
{/await}

<style>
  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
  }
</style>

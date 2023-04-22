<script>
  import { fade } from 'svelte/transition';

  function close() {
    opened = false;
  }

  function open() {
    opened = true;
  }

  let opened = false;
</script>

<slot name="trigger" {opened} {open} {close} />

{#if opened}
  <div
    class="modal-overlay"
    role="presentation"
    on:click={close}
    transition:fade={{ duration: 150 }}
  >
    <div
      class="modal"
      role="presentation"
      on:click={(e) => e.stopPropagation()}
    >
      <slot />
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    position: relative;
    background-color: #ffffff;
    width: 640px;
    margin: 0 16px;
    padding: 32px;
  }
</style>

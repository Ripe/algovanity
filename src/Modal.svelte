<script>
  let { show = $bindable(), children } = $props();

  let dialog = $state();

  $effect(() => {
    if (show) dialog.showModal();
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialog}
  onclose={() => (show = false)}
  onclick={(e) => {
    if (e.target === dialog) dialog.close();
  }}
>
  <div class="modal-body">
    {@render children?.()}
  </div>
</dialog>

<style>
  dialog {
    background-color: var(--panel);
    color: var(--text);
    width: 640px;
    max-width: calc(100vw - 2rem);
    padding: 0;
    border: 1px solid var(--border);
    border-radius: 0;
  }

  .modal-body {
    padding: 2rem;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
  }

  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes zoom {
    from {
      transform: scale(0.97);
    }
    to {
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    dialog[open] {
      animation: none;
    }
  }
</style>

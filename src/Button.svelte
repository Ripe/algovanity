<script>
  let { variant, children, ...rest } = $props();
</script>

<button class={variant} {...rest}>
  {@render children?.()}
</button>

<style>
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 42px;
    color: var(--on-accent);
    background: var(--accent);
    border: 0;
    border-radius: 0;
    outline: none;
    margin: 0;
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 700;
    padding: 0 1.4rem;
    cursor: pointer;
  }

  button:focus-visible {
    outline: 2px solid var(--text-white);
    outline-offset: 2px;
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  button:not(:disabled):active {
    filter: brightness(0.9);
  }

  .small {
    height: auto;
    padding: 0.35rem 0.75rem;
    font-size: 0.65rem;
  }

  .link {
    height: auto;
    background: none;
    border: 0;
    padding: 0;
    color: var(--text);
    text-transform: none;
    font-weight: 400;
    text-decoration: underline;
  }

  .link:hover {
    color: var(--text-white);
  }

  :global(.icon) {
    width: 13px;
    height: 13px;
    flex: none;
  }
</style>

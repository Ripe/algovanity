<script>
  let { variant, children, ...rest } = $props();
</script>

<button class={variant} {...rest}>
  {@render children?.()}
</button>

<style>
  button {
    color: #ffffff;
    border: 0;
    border-radius: 0;
    background: #000000;
    outline: none;
    margin: 0;
    font-size: inherit;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: inherit;
  }

  button[type='submit'] {
    width: 100%;
  }

  button:disabled {
    background-color: #cccccc;
  }

  button:not(:disabled):active {
    background-color: #333333;
  }

  .link {
    background: none;
    border: none;
    padding: 0;
    color: #0a00ff;
    text-decoration: none;
    letter-spacing: normal;
    font-size: inherit;
    text-transform: inherit;
  }

  .link:hover {
    text-decoration: underline;
  }

  .link:not(:disabled):active {
    background: none;
  }

  .small {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }
</style>

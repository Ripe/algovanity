<script>
  export let variant = undefined;
  export let onClick = () => {};
  export let disabled = false;
</script>

<button
  type="button"
  class={variant}
  on:click|preventDefault={onClick}
  {disabled}
>
  <slot />
</button>

<style>
  button {
    color: #ffffff;
    border: 0;
    border-radius: 0;
    background: #000000;
    outline: none;
    margin: 0;
    font-size: 18px;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 8px 16px;
    cursor: pointer;
    font-family: inherit;
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
    padding: 6px 12px;
    font-size: 13px;
  }
</style>

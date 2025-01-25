<script>
  let { id, label, type = 'text', note, value, options = [], ...rest } = $props();
</script>

<div class="control">
  {#if type === 'radio'}
    <div class="label">{label}</div>
    {#each options as option}
      <label class="radio">
        <input type="radio" bind:group={value} value={option.value} {...rest} />
        <span>{option.label}</span>
      </label>
    {/each}
  {:else}
    <label for={id}>{label}</label>
    <input {id} {type} {value} {...rest} />
  {/if}
  {#if note}
    <p class="note">{note}</p>
  {/if}
</div>

<style>
  input[type='text'],
  input[type='number'] {
    font-family: inherit;
    font-size: inherit;
    padding: 0.25rem;
    margin: 0;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    border-radius: 4px;
    width: 100%;
  }

  input:disabled {
    color: #ccc;
  }

  .control {
    margin-bottom: 1rem;
  }

  label,
  .label {
    display: block;
    margin-bottom: 0.5rem;
  }

  label[for],
  .label {
    font-weight: bold;
  }

  .radio {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr;
    grid-gap: 0.5rem;
  }

  input[type='radio'] {
    appearance: none;
    background-color: #fff;
    margin: 0;
    color: currentColor;
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid currentColor;
    border-radius: 50%;
    display: grid;
    place-content: center;
    transform: translateY(1px);
  }

  input[type='radio']::before {
    content: '';
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em currentColor;
  }

  input[type='radio']:checked::before {
    transform: scale(1);
  }

  .radio span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .note {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #717171;
  }
</style>

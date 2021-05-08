<script>
  export let id;
  export let label;
  export let value;
  export let type = 'text';
  export let note = undefined;
  export let options = [];
  export let disabled = false;
</script>

<div class="control">
  {#if type === 'radio'}
    <div class="label">{label}</div>
    {#each options as option}
      <label class="radio">
        <input
          type="radio"
          bind:group={value}
          value={option.value}
          {disabled}
        />
        <span>{option.label}</span>
      </label>
    {/each}
  {:else}
    <label for={id}>{label}</label>
    {#if type === 'number'}
      <input {id} {disabled} bind:value type="number" />
    {:else}
      <input {id} {disabled} bind:value type="text" />
    {/if}
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
    padding: 4px;
    height: 32px;
    margin: 0;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    border-radius: 2px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
    width: 100%;
  }

  input:disabled {
    color: #ccc;
  }

  .control {
    margin-bottom: 16px;
  }

  label,
  .label {
    display: block;
    margin-bottom: 8px;
  }

  label[for],
  .label {
    font-weight: bold;
  }

  .radio {
    display: flex;
    align-items: center;
  }

  .radio span {
    margin-left: 8px;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .note {
    margin-top: 8px;
    font-size: 13px;
    color: #717171;
  }
</style>

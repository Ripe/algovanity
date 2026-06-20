<script>
  let {
    id,
    label,
    type = 'text',
    note,
    value,
    options = [],
    hideLabel = false,
    variant,
    ...rest
  } = $props();
</script>

<div class="control">
  {#if type === 'radio'}
    <span class="label" class:sr-only={hideLabel}>{label}</span>
    {#if variant === 'segmented'}
      <div class="segmented" role="radiogroup" aria-label={label}>
        {#each options as option}
          <label class="segment">
            <input type="radio" bind:group={value} value={option.value} {...rest} />
            {option.label}
          </label>
        {/each}
      </div>
    {:else}
      {#each options as option}
        <label class="radio">
          <input type="radio" bind:group={value} value={option.value} {...rest} />
          <span>{option.label}</span>
        </label>
      {/each}
    {/if}
  {:else}
    <label for={id} class:sr-only={hideLabel}>{label}</label>
    <input {id} {type} {value} {...rest} />
  {/if}
  {#if note}
    <p class="note">{note}</p>
  {/if}
</div>

<style>
  .control {
    margin: 0;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  label,
  .label {
    display: block;
    margin-bottom: 0.35rem;
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  input[type='text'],
  input[type='number'] {
    font-family: inherit;
    font-size: 0.85rem;
    height: 42px;
    padding: 0 0.75rem;
    margin: 0;
    width: 100%;
    color: var(--text);
    background: var(--panel);
    border: 1px solid var(--border-strong);
    border-radius: 0;
  }

  input[type='text']:focus-visible,
  input[type='number']:focus-visible {
    outline: 2px solid var(--text-white);
    outline-offset: -2px;
  }

  input:disabled {
    color: var(--text-faint);
    opacity: 0.7;
  }

  .segmented {
    display: inline-flex;
    height: 42px;
    vertical-align: middle;
    border: 1px solid var(--border-strong);
  }

  .segment {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0.85rem;
    font-size: 0.85rem;
    line-height: 1;
    color: var(--text-muted);
    cursor: pointer;
    border-right: 1px solid var(--border-strong);
    margin: 0;
  }

  .segment:last-child {
    border-right: none;
  }

  .segment input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    margin: 0;
  }

  .segment:has(input:checked) {
    background: var(--accent);
    color: var(--on-accent);
    font-weight: 700;
  }

  .segment:has(input:focus-visible) {
    outline: 2px solid var(--text-white);
    outline-offset: -2px;
  }

  .segmented:has(input:disabled) {
    opacity: 0.7;
  }

  .segment:has(input:disabled) {
    cursor: not-allowed;
    color: var(--text-faint);
  }

  .segment:has(input:checked):has(input:disabled) {
    background: var(--border-strong);
    color: var(--text-muted);
  }

  .note {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: var(--text-muted);
  }
</style>

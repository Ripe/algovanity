<script>
  let { matches = 0, attempts = 0, startTime = 0, now = 0 } = $props();

  function fmtElapsed(ms) {
    if (ms <= 0) return '00:00';
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = (Math.floor(total / 60) % 60).toString().padStart(2, '0');
    const s = (total % 60).toString().padStart(2, '0');
    return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
  }

  let elapsedMs = $derived(startTime ? Math.max(0, now - startTime) : 0);
  let speed = $derived(elapsedMs > 0 ? Math.floor((1000 * attempts) / elapsedMs) : 0);
</script>

<div class="stats">
  <div class="stat">
    <div class="value">{attempts.toLocaleString()}</div>
    <div class="label">Generated</div>
  </div>
  <div class="stat">
    <div class="value">{speed.toLocaleString()}/s</div>
    <div class="label">Rate</div>
  </div>
  <div class="stat">
    <div class="value">{matches.toLocaleString()}</div>
    <div class="label">Found</div>
  </div>
  <div class="stat">
    <div class="value">{fmtElapsed(elapsedMs)}</div>
    <div class="label">Elapsed</div>
  </div>
</div>

<style>
  .stats {
    display: flex;
    background: var(--panel);
    border: 1px solid var(--border);
  }

  .stat {
    flex: 1;
    min-width: 0;
    padding: 0.85rem;
  }

  .stat + .stat {
    border-left: 1px solid var(--border);
  }

  .value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text);
    overflow-wrap: anywhere;
    font-variant-numeric: tabular-nums;
  }

  .label {
    color: var(--text-faint);
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 0.35rem;
  }

  @media (max-width: 560px) {
    .stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .stat + .stat {
      border-left: none;
    }

    .stat:nth-child(odd) {
      border-right: 1px solid var(--border);
    }

    .stat:nth-child(1),
    .stat:nth-child(2) {
      border-bottom: 1px solid var(--border);
    }
  }
</style>

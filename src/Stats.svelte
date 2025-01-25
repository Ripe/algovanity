<script>
  let { matches = 0, attempts = 0, startTime = 0 } = $props();
</script>

<h2>Stats</h2>
<dl>
  <dt>Matches</dt>
  <dd>{matches.toLocaleString()}</dd>
  <dt>Generated</dt>
  <dd>{attempts.toLocaleString()}</dd>
  <dt>Speed</dt>
  <dd>
    {(Math.floor((1000 * attempts) / (Date.now() - startTime)) || 0).toLocaleString()} addr/s
  </dd>
</dl>

<style>
  dl {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 1rem;
    margin: 0;
  }

  dt {
    font-style: italic;
  }

  dd {
    margin: 0;
  }
</style>

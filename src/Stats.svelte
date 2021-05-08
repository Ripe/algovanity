<script>
  export let matches = 0;
  export let attempts = 0;
  export let startTime = Date.now();
</script>

<h2>Stats</h2>
<dl>
  <dt>Matches</dt>
  <dd>{matches.toLocaleString()}</dd>
  <dt>Generated</dt>
  <dd>{attempts.toLocaleString()}</dd>
  <dt>Speed</dt>
  <dd>
    {(
      Math.floor((1000 * attempts) / (Date.now() - startTime)) || 0
    ).toLocaleString()} addr/s
  </dd>
</dl>

<style>
  dl {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 16px;
    margin: 0;
  }

  dt {
    font-style: italic;
  }

  dd {
    margin: 0;
  }
</style>

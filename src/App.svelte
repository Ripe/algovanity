<script>
  import AlgoWorker from './algo.worker';
  import Header from './Header.svelte';
  import FAQs from './Faqs.svelte';
  import Results from './Results.svelte';
  import Footer from './Footer.svelte';
  import FormControl from './FormControl.svelte';
  import Button from './Button.svelte';
  import Stats from './Stats.svelte';
  import Box from './Box.svelte';

  let workers = [];
  let matches = [];
  let keyword = '';
  let attempts = 0;
  let method = 'includes';
  let workerCount = navigator.hardwareConcurrency || 3;
  let startTime = 0;
  let isRunning = false;

  $: keyword = keyword.toUpperCase().replace(/[^A-Z2-7]+$/gi, '');

  function start() {
    for (let i = 0; i < workerCount; i++) {
      workers.push(new AlgoWorker());

      workers[i].onmessage = ({ data }) => {
        if (data.attempts) {
          attempts += data.attempts;
        } else if (data.address) {
          matches = [data, ...matches];
        }
      };

      workers[i].postMessage({ method, keyword });
    }

    startTime = Date.now();

    isRunning = true;
  }

  function stop() {
    workers.forEach((worker) => worker.terminate());
    attempts = 0;
    workers = [];
    isRunning = false;
  }
</script>

<main>
  <Header />
  <div class="wrapper">
    <div>
      <Box>
        <h2>Search</h2>
        <FormControl
          id="keyword"
          label="Keyword"
          disabled={isRunning}
          note="Your text can only include letters A - Z and numbers 2 - 7. For the fastest results, keep your text under 5 characters long."
          bind:value={keyword}
        />
        <FormControl
          id="match"
          label="Match method"
          type="radio"
          disabled={isRunning}
          options={[
            { value: 'startsWith', label: 'Start' },
            { value: 'includes', label: 'Anywhere (fastest)' },
            { value: 'endsWith', label: 'End' },
          ]}
          bind:value={method}
        />
        <FormControl
          id="workerCount"
          label="Threads"
          type="number"
          disabled={isRunning}
          bind:value={workerCount}
        />
        {#if !isRunning}
          <Button onClick={start} disabled={keyword.length === 0}>Start</Button>
        {:else}
          <Button onClick={stop}>Stop</Button>
        {/if}
      </Box>
      <Box>
        <Stats matches={matches.length} {attempts} {startTime} />
      </Box>
    </div>
    <div class="results">
      <Results {matches} />
    </div>
    <Box>
      <FAQs />
    </Box>
  </div>
  <Footer />
</main>

<style>
  :global(html, body) {
    position: relative;
  }

  :global(body) {
    color: #333333;
    background: #fafafa;
    margin: 0;
    padding: 0;
    overflow-y: scroll;
    line-height: 1.2;
    font-size: 16px;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  }

  :global(h1, h2, h3) {
    margin: 0 0 16px;
  }

  :global(p) {
    margin: 0 0 8px;
    line-height: 1.5;
  }

  :global(a, a:visited) {
    color: #0a00ff;
    text-decoration: none;
  }

  :global(a:hover) {
    text-decoration: underline;
  }

  main {
    margin: 0 auto;
    padding: 16px;
  }

  @media (min-width: 960px) {
    main {
      max-width: 960px;
      padding: 32px 16px;
    }

    .wrapper {
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-column-gap: 16px;
    }

    .results {
      order: 3;
      grid-column: span 2;
    }
  }
</style>

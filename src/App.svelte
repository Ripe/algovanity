<script>
  import AlgoWorker from './algo-worker?worker&inline';
  import Header from './Header.svelte';
  import FAQs from './Faqs.svelte';
  import Results from './Results.svelte';
  import Footer from './Footer.svelte';
  import FormControl from './FormControl.svelte';
  import Button from './Button.svelte';
  import Stats from './Stats.svelte';
  import Box from './Box.svelte';

  let workers = [];
  let matches = $state([]);
  let attempts = $state(0);
  let startTime = $state(0);
  let isRunning = $state(false);

  function oninput(event) {
    event.target.value = event.target.value.toUpperCase().replace(/[^A-Z2-7\,]+$/gi, '');
  }

  function onsubmit(event) {
    event.preventDefault();

    if (isRunning) {
      workers.forEach((worker) => worker.terminate());
      attempts = 0;
      workers = [];
      isRunning = false;

      return;
    }

    const formData = new FormData(event.target);
    const keywords = formData
      .get('keyword')
      .split(',')
      .map((k) => k.trim().toUpperCase())
      .filter(Boolean);
    const method = formData.get('method') || 'includes';
    const workerCount = parseInt(formData.get('workerCount'));

    if (!keywords.length) return;

    for (let i = 0; i < workerCount; i++) {
      workers.push(new AlgoWorker());

      workers[i].onmessage = ({ data }) => {
        if (data.attempts) {
          attempts += data.attempts;
        } else if (data.address) {
          matches = [data, ...matches];
        }
      };

      workers[i].postMessage({ method, keywords });
    }

    startTime = Date.now();
    isRunning = true;
  }
</script>

<main>
  <Header />
  <div class="wrapper">
    <div>
      <Box>
        <h2>Search</h2>
        <form {onsubmit}>
          <FormControl
            id="keywords"
            name="keyword"
            label="Keywords (comma-separated)"
            disabled={isRunning}
            note="Enter multiple keywords separated by commas. Each keyword can only contain letters (A-Z) and numbers (2-7) and should be less than 5 characters for optimal performance."
            required
            {oninput}
          />
          <FormControl
            id="match"
            name="method"
            label="Match method"
            type="radio"
            disabled={isRunning}
            options={[
              { value: 'startsWith', label: 'Start' },
              { value: 'includes', label: 'Anywhere (fastest)' },
              { value: 'endsWith', label: 'End' }
            ]}
            value="includes"
          />
          <FormControl
            id="workerCount"
            name="workerCount"
            label="Web workers"
            type="number"
            min="1"
            disabled={isRunning}
            value={navigator.hardwareConcurrency || 3}
            note="The higher this number, the more CPU resources the search will require."
          />
          <Button type="submit">
            {isRunning ? 'Stop' : 'Start'}
          </Button>
        </form>
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
      Cantarell, 'Helvetica Neue', sans-serif;
  }

  :global(h1, h2, h3) {
    margin: 0 0 1rem;
  }

  :global(p) {
    margin: 0 0 0.5rem;
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
    padding: 1rem;
  }

  @media (min-width: 960px) {
    main {
      max-width: 960px;
      padding: 2rem 1rem;
    }

    .wrapper {
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-column-gap: 1rem;
    }

    .results {
      order: 3;
      grid-column: span 2;
    }
  }
</style>

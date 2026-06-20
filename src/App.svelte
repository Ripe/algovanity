<script>
  import { onDestroy, onMount } from 'svelte';
  import AlgoWorker from './algo-worker?worker&inline';
  import Header from './Header.svelte';
  import FAQs from './Faqs.svelte';
  import Results from './Results.svelte';
  import Footer from './Footer.svelte';
  import FormControl from './FormControl.svelte';
  import Button from './Button.svelte';
  import Stats from './Stats.svelte';

  let workers = [];
  let matches = $state([]);
  let attempts = $state(0);
  let startTime = $state(0);
  let now = $state(0);
  let isRunning = $state(false);
  let clock;

  function oninput(event) {
    event.target.value = event.target.value.toUpperCase().replace(/[^A-Z2-7\,]+$/gi, '');
  }

  function stop() {
    workers.forEach((worker) => worker.terminate());
    clearInterval(clock);
    attempts = 0;
    startTime = 0;
    now = 0;
    workers = [];
    isRunning = false;
  }

  onDestroy(() => clearInterval(clock));

  onMount(() => document.getElementById('keywords')?.focus());

  function onsubmit(event) {
    event.preventDefault();

    if (isRunning) {
      stop();
      return;
    }

    const formData = new FormData(event.target);
    const keywords = formData
      .get('keyword')
      .split(',')
      .map((k) => k.trim().toUpperCase())
      .filter(Boolean);
    const method = formData.get('method') || 'includes';
    const workerCount = navigator.hardwareConcurrency || 3;

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
    now = startTime;
    clock = setInterval(() => (now = Date.now()), 1000);
    isRunning = true;
  }
</script>

<main>
  <Header />

  <section class="hero">
    <h1>Generate an Algorand vanity address</h1>
  </section>

  <form {onsubmit}>
    <div class="searchrow">
      <FormControl
        id="keywords"
        name="keyword"
        label="Keywords (comma-separated)"
        hideLabel
        disabled={isRunning}
        required
        {oninput}
      />
      <FormControl
        id="match"
        name="method"
        label="Match method"
        hideLabel
        type="radio"
        variant="segmented"
        disabled={isRunning}
        options={[
          { value: 'startsWith', label: 'Starts' },
          { value: 'includes', label: 'Anywhere' },
          { value: 'endsWith', label: 'Ends' }
        ]}
        value="includes"
      />
      <Button type="submit">
        {isRunning ? 'Stop' : 'Generate'}
        {#if !isRunning}
          <svg
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="square"
            aria-hidden="true"
          >
            <path d="M4 12h15M12 5l7 7-7 7" />
          </svg>
        {/if}
      </Button>
    </div>
    <p class="help">
      Enter multiple keywords separated by commas. Each keyword can only contain letters (A-Z) and
      numbers (2-7) and should be less than 5 characters for optimal performance.
    </p>
  </form>

  <Stats matches={matches.length} {attempts} {startTime} {now} />

  {#if matches.length}
    <section class="results">
      <div class="results-header">Results &middot; {matches.length}</div>
      <Results {matches} />
    </section>
  {/if}

  <section class="faq">
    <FAQs />
  </section>

  <Footer />
</main>

<style>
  main {
    max-width: 750px;
    margin: 0 auto;
    padding: 2.5rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-height: 100dvh;
  }

  .hero {
    margin-bottom: 1.75rem;
  }

  .hero h1 {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-white);
    margin: 0;
    line-height: 1.25;
  }

  form {
    margin-bottom: 1.5rem;
  }

  .searchrow {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .searchrow > :global(.control) {
    flex: none;
  }

  .searchrow > :global(.control:first-child) {
    flex: 1;
    min-width: 0;
  }

  .searchrow :global(button) {
    min-width: 8.5rem;
  }

  .help {
    margin: 0.6rem 0 0;
    color: var(--text-muted);
    font-size: 0.75rem;
    line-height: 1.5;
  }

  .results {
    margin-top: 1.5rem;
  }

  .results-header {
    color: var(--text-faint);
    font-size: 0.65rem;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
  }

  .faq {
    margin-top: 2rem;
    flex: 1 0 auto;
  }

  @media (max-width: 560px) {
    .searchrow {
      flex-wrap: wrap;
    }

    /* keywords input takes the full first row */
    .searchrow > :global(.control:first-child) {
      flex: 1 1 100%;
    }

    /* segmented control fills the rest of the second row, beside the button */
    .searchrow > :global(.control) {
      flex: 1;
      min-width: 0;
    }

    .searchrow :global(.segmented) {
      display: flex;
      width: 100%;
    }

    .searchrow :global(.segment) {
      flex: 1;
      min-width: 0;
      padding: 0.5rem 0.35rem;
      font-size: 0.75rem;
    }

    .searchrow :global(button) {
      min-width: 0;
      padding: 0 1rem;
    }
  }
</style>

<script>
  import ExternalLink from './ExternalLink.svelte';
  import { CONTACT_EMAIL } from './constants';
</script>

<div class="footer">
  <div class="meta">
    <div class="copyright">© 2026 Algo Vanity</div>
    <ul class="links">
      <li><a href={`mailto:${CONTACT_EMAIL}`}>Contact</a></li>
      <li><ExternalLink href="https://github.com/Ripe/algovanity">Source</ExternalLink></li>
      <li>
        <ExternalLink href="https://github.com/Ripe/algovanity/blob/master/LICENSE"
          >License</ExternalLink
        >
      </li>
    </ul>
  </div>
</div>

<style>
  .footer {
    margin-top: 2.5rem;
    padding-top: 1.25rem;
  }

  .meta {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 0.85rem;
  }

  .copyright {
    color: var(--text-muted);
    font-size: 0.85rem;
  }

  .links {
    list-style: none;
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;
  }

  .links :global(a) {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.85rem;
  }

  .links :global(a:hover) {
    color: var(--text-white);
    text-decoration: underline;
  }
</style>

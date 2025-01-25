<script>
  import ExternalLink from './ExternalLink.svelte';
  import { CONTACT_EMAIL } from './constants';
</script>

<div class="footer">
  <div class="copyright">Copyright © 2025 Algo Vanity</div>
  <ul class="links">
    <li><a href={`mailto:${CONTACT_EMAIL}`}>Contact</a></li>
    <li>
      <ExternalLink href="https://github.com/Ripe/algovanity">Source</ExternalLink>
    </li>
  </ul>

  <p class="disclaimer">
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  </p>
</div>

<style>
  .footer {
    margin: 1rem 1rem 0;
  }

  .disclaimer {
    color: #717171;
    font-size: 0.75rem;
    margin-top: 1rem;
  }

  .links {
    list-style: none;
    display: inline-block;
    margin: 1rem 0 0;
    padding: 0;
  }

  .copyright {
    margin-right: 1rem;
  }

  .links li {
    display: inline-block;
    margin-right: 1rem;
  }

  @media (min-width: 960px) {
    .copyright {
      display: inline-block;
    }

    .links {
      margin-top: 0;
    }
  }
</style>

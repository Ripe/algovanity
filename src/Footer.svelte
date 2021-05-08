<script>
  import Address from './Address.svelte';
  import Modal from './Modal.svelte';
  import QRCode from './QRCode.svelte';
  import ExternalLink from './ExternalLink.svelte';
  import Button from './Button.svelte';
  import { CONTACT_EMAIL, TIP_ADDRESS } from './constants';
</script>

<div class="footer">
  <div class="copyright">Copyright © 2021 Algo Vanity</div>
  <ul class="links">
    <li><a href={`mailto:${CONTACT_EMAIL}`}>Contact</a></li>
    <li>
      <ExternalLink href="https://github.com/Ripe/algovanity"
        >Source</ExternalLink
      >
    </li>
    <li>
      <Modal let:open>
        <Button slot="trigger" variant="link" onClick={open}>Tip</Button>
        <h3>Tip</h3>
        <p>
          I really appreciate any tips made in ALGO, all tips will go towards
          keeping the website up and future projects.
        </p>
        <div class="tip">
          <div class="qr">
            <QRCode
              text={'algorand://' + TIP_ADDRESS}
              width={256}
              height={256}
            />
          </div>
          <Address address={TIP_ADDRESS} />
        </div>
      </Modal>
    </li>
  </ul>

  <p class="disclaimer">
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
    IN THE SOFTWARE.
  </p>
</div>

<style>
  .footer {
    margin: 16px 16px 0;
  }

  .qr {
    margin-bottom: 32px;
  }

  .tip {
    text-align: center;
    margin-top: 32px;
  }

  .disclaimer {
    color: #717171;
    font-size: 13px;
    margin-top: 16px;
  }

  .links {
    list-style: none;
    display: inline-block;
    margin: 16px 0 0;
    padding: 0;
  }

  .copyright {
    margin-right: 16px;
  }

  .links li {
    display: inline-block;
    margin-right: 16px;
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

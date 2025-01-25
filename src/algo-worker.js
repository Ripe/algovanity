import { generateAccount, secretKeyToMnemonic } from 'algosdk';

const STEP = 10;

self.onmessage = (e) => {
  if (e.data) {
    const { method = 'includes', keywords } = e.data;
    let attempts = 0;

    const checkAddress = (address) => {
      if (!address) {
        return false;
      }

      for (const keyword of keywords) {
        if (address[method](keyword)) {
          return keyword;
        }
      }

      return null;
    };

    setInterval(() => {
      if (attempts >= STEP) {
        self.postMessage({ attempts });
        attempts = 0;
      }

      const account = generateAccount();
      const address = account.addr.toString();
	  const keyword = checkAddress(address);

      if (keyword) {
        self.postMessage({
          address,
          keyword,
          sk: account.sk,
          mnemonic: secretKeyToMnemonic(account.sk)
        });
      }

      attempts++;
    }, 10);
  }
};

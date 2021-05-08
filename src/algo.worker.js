import { generateAccount, secretKeyToMnemonic } from 'algosdk';

const STEP = 10;

self.onmessage = (e) => {
  if (e.data) {
    const { method, keyword } = e.data;
    let attempts = 0;

    const checkAddress = (address) => {
      if (!address) {
        return false;
      }

      switch (method) {
        case 'startsWith':
          return address.startsWith(keyword);

        case 'endsWith':
          return address.endsWith(keyword);

        default:
          return address.includes(keyword);
      }
    };

    setInterval(() => {
      if (attempts >= STEP) {
        self.postMessage({ attempts });
        attempts = 0;
      }

      const account = generateAccount();

      if (checkAddress(account.addr)) {
        self.postMessage({
          address: account.addr,
          keyword: keyword,
          sk: account.sk,
          mnemonic: secretKeyToMnemonic(account.sk),
        });
      }

      attempts++;
    }, 1);
  }
};

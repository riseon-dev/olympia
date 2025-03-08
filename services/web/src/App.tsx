import React, { useCallback, useMemo } from 'react';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import type { Adapter } from '@solana/wallet-adapter-base';
import type { SolanaSignInInput } from '@solana/wallet-standard-features';
import {AutoConnectProvider} from './components/AutoConnectProvider';
import {StatelessApp} from './components/StatelessApp';
import {clusterApiUrl} from '@solana/web3.js';
import {UnsafeBurnerWalletAdapter} from '@solana/wallet-adapter-wallets';
import {ThemeProvider} from './components/ThemeProvider';

function App(): React.ReactElement {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/anza-xyz/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      new UnsafeBurnerWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  )


  const autoSignIn = useCallback(async (adapter: Adapter) => {
    if (!('signIn' in adapter)) return true;

    // Fetch the signInInput from the backend

    const createResponse = await fetch("http://localhost:3000/solana/generate");
    const input: SolanaSignInInput = await createResponse.json();

    // const input: SolanaSignInInput = await createSignInData();

    // Send the signInInput to the wallet and trigger a sign-in request
    const output = await adapter.signIn(input);
    const constructPayload = JSON.stringify({input, output });

    // Verify the sign-in output against the generated input server-side
    const verifyResponse = await fetch("http://localhost:3000/solana/verify", {
      method: "POST",
      body: constructPayload,
    });
    const success = await verifyResponse.json();
    console.log('success', success);


    /* ------------------------------------ BACKEND ------------------------------------ */
    // "/backend/verifySIWS" endpoint, `constructPayload` receieved
    // const deconstructPayload: { input: SolanaSignInInput; output: SolanaSignInOutput } = JSON.parse(constructPayload);
    // const backendInput = deconstructPayload.input;
    // const backendOutput: SolanaSignInOutput = {
    //   account: {
    //     ...output.account,
    //     publicKey: new Uint8Array(output.account.publicKey),
    //   },
    //   signature: new Uint8Array(output.signature),
    //   signedMessage: new Uint8Array(output.signedMessage),
    // };
    //
    // if (!verifySignIn(backendInput, backendOutput)) {
    //   console.error('Sign In verification failed!')
    //   throw new Error('Sign In verification failed!');
    // }
    /* ------------------------------------ BACKEND ------------------------------------ */

    return false;
  }, []);

  const autoConnect = useCallback(async (adapter: Adapter) => {

    adapter.autoConnect().catch(() => {
      return autoSignIn(adapter);
    });
    return false;
  }, [autoSignIn]);

  return (
    <AutoConnectProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect={autoConnect}>
          <WalletModalProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <StatelessApp />
            </ThemeProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </AutoConnectProvider>
  );
};


export default App

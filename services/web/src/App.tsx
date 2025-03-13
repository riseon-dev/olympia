import React, { useMemo } from 'react';
import {
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { AutoConnectProvider } from './components/AutoConnectProvider';
import { StatelessApp } from './components/StatelessApp';
import { clusterApiUrl } from '@solana/web3.js';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { ThemeProvider } from './components/ThemeProvider';
import { CookiesProvider } from 'react-cookie';
// import {ThemeSwitcher} from './components/ThemeSwitcher';

function App(): React.ReactElement {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new UnsafeBurnerWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <AutoConnectProvider>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets}>
            <WalletModalProvider>
              <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                {/*<ThemeSwitcher />*/}
                <StatelessApp />
              </ThemeProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </AutoConnectProvider>
    </CookiesProvider>
  );
}

export default App;

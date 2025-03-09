import React from 'react';
import { ConnectedMethods } from '../../utils/connectMethods.ts';
import ConnectButton from '../ConnectButton';
import { PublicKey } from '@solana/web3.js';
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

export type BarProps = {
  publicKey: PublicKey | null;
  connectedMethods: ConnectedMethods[];
};

const Bar = (props: BarProps): React.ReactElement => {
  const { publicKey, connectedMethods } = props;

  return (
    <div>
      {publicKey ? (
        <div>
          <WalletDisconnectButton />
          {connectedMethods.map((method, i) => (
            <ConnectButton
              name={`${method.name}`}
              key={`${method.name}-${i}`}
              onClick={method.onClick}
            />
          ))}
        </div>
      ) : (
        <div>
          <WalletMultiButton />
        </div>
      )}
    </div>
  );
};

export default Bar;

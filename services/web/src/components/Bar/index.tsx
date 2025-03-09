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
  const signIn = connectedMethods.find((method) => method.name === 'Sign In');
  const disconnect = connectedMethods.find((method) => method.name === 'Disconnect');

  return (
    <div>
      {publicKey ? (
        <div>
          <WalletDisconnectButton />

          {signIn && (<ConnectButton name={'Sign In'} key={'Sign In'} onClick={signIn.onClick} />) }
          {disconnect && (<ConnectButton name={'Disconnect'} key={'Disconnect'} onClick={disconnect.onClick} />) }
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

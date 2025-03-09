import React from 'react';
import { ConnectedMethods } from '../../utils/connectMethods.ts';
import ConnectButton from '../ConnectButton';
import { PublicKey } from '@solana/web3.js';
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { Box, Flex, Section } from '@radix-ui/themes';

export type BarProps = {
  publicKey: PublicKey | null;
  connectedMethods: ConnectedMethods[];
};

const SignInButtons = (props: {connectedMethods: ConnectedMethods[] } ): React.ReactElement => {
  const { connectedMethods } = props;
  const signIn = connectedMethods.find((method) => method.name === 'Sign In');

  return (
    <>
    <Box width={'150px'}>
    <WalletDisconnectButton />
    </Box>
      {signIn && (
        <Box width={'150px'}>
          <ConnectButton name={'Sign In'} key={'Sign In'} onClick={signIn.onClick} />
        </Box>
      )}
      </>

  )
}

const Bar = (props: BarProps): React.ReactElement => {
  const { publicKey, connectedMethods } = props;


  return (
    <Section>
      <Flex>
        <Box>
          hello
        </Box>
        <Box>
          World
        </Box>



      {publicKey ? (

        <SignInButtons connectedMethods={connectedMethods} />

      ) : (
        <Box width={'150px'}>
          <WalletMultiButton />
        </Box>
      )}
      </Flex>
    </Section>
  );
};

export default Bar;

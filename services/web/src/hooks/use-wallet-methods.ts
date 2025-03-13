import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback, useMemo } from 'react';
import type { SolanaSignInInput } from '@solana/wallet-standard-features';
import axios from 'axios';
import { useCookies } from 'react-cookie';


export const useWalletMethods = () => {
  const { wallet, publicKey, signIn, connect, disconnect } = useWallet();

  const [_accessToken, setAccessToken] = useCookies(['access_token']);
  const [_refreshToken, setRefreshToken] = useCookies(['refresh_token']);

  //  const { wallet, publicKey, connect, disconnect, signMessage, signIn } = useWallet();

  /** SignMessage */
  // const handleSignMessage = useCallback(async () => {
  //   if (!publicKey || !wallet) return;
  //
  //   try {
  //     const encodedMessage = new TextEncoder().encode(message);
  //     const signature = await signMessage?.(encodedMessage);
  //
  //     console.log({
  //       status: 'success',
  //       method: 'signMessage',
  //       message: `Message signed with signature: ${JSON.stringify(signature)}`,
  //     });
  //   } catch (error) {
  //     console.log({
  //       status: 'error',
  //       method: 'signMessage',
  //       // eslint-disable-next-line
  //       // @ts-ignore
  //       message: error?.message,
  //     });
  //   }
  // }, [ publicKey, signMessage, wallet]);

  /** SignIn */
  const handleSignIn = useCallback(async () => {
    if (!publicKey || !wallet) return;
    try {
      // const signInData = await createSignInData();

      console.log('handleSignIn');
      const createResponse = await axios.get(
        'http://localhost:3000/solana/generate'
      );
      const input: SolanaSignInInput = createResponse.data;

      // eslint-disable-next-line
      // @ts-ignore
      const output = await signIn(input);

      console.log('output', JSON.stringify(output));

      // send message to backend
      const constructPayload = JSON.stringify({
        input,
        output: {
          account: {
            //    readonly address: string;
            //
            //     /** Public key of the account, corresponding with a secret key to use. */
            //     readonly publicKey: ReadonlyUint8Array;
            //
            //     /**
            //      * Chains supported by the account.
            //      *
            //      * This must be a subset of the {@link Wallet.chains | chains} of the Wallet.
            //      */
            //     readonly chains: IdentifierArray;
            //
            //     /**
            //      * Feature names supported by the account.
            //      *
            //      * This must be a subset of the names of {@link Wallet.features | features} of the Wallet.
            //      */
            //     readonly features: IdentifierArray;
            publicKey: publicKey.toBuffer().toString('hex'),
          },
          signedMessage: output.signedMessage,
          signature: output.signature,
        },
      });

      const verifyResponse = await axios.post(
        'http://localhost:3000/solana/signin',
        constructPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const success = verifyResponse.data;
      if (verifyResponse.status === 200 || verifyResponse.status === 201) {
        console.log('verifyResponse', verifyResponse);
        setAccessToken('access_token', verifyResponse.data.access_token);
        setRefreshToken('refresh_token', verifyResponse.data.refresh_token);

        console.log('success', success);

        console.log({
          status: 'success',
          method: 'signMessage',
          message: `Message signed: ${JSON.stringify(output.signedMessage)} by ${output.account.address} with signature ${JSON.stringify(output.signature)}`,
        });
      }

    } catch (error) {
      console.log({
        status: 'error',
        method: 'signIn',
        // eslint-disable-next-line
        // @ts-ignore
        message: error.message,
      });
    }
  }, [publicKey, signIn, wallet]);

  /** SignInError */
  // const handleSignInError = useCallback(async () => {
  //   if (!publicKey || !wallet) return;
  //   const signInData = await createSignInErrorData();
  //
  //   try {
  //     // eslint-disable-next-line
  //     // @ts-ignore
  //     const {account, signedMessage, signature} = await signIn(signInData);
  //     console.log({
  //       status: 'success',
  //       method: 'signMessage',
  //       message: `Message signed: ${JSON.stringify(signedMessage)} by ${account.address} with signature ${JSON.stringify(signature)}`,
  //     });
  //   } catch (error) {
  //     console.log({
  //       status: 'error',
  //       method: 'signIn',
  //       // eslint-disable-next-line
  //       // @ts-ignore
  //       message: error.message,
  //     });
  //   }
  // }, [publicKey, signIn, wallet]);

  /** Connect */
  const handleConnect = useCallback(async () => {
    if (!publicKey || !wallet) return;

    try {
      await connect();
    } catch (error) {
      console.log({
        status: 'error',
        method: 'connect',
        // eslint-disable-next-line
        // @ts-ignore
        message: error.message,
      });
    }
  }, [connect, publicKey, wallet]);

  /** Disconnect */
  const handleDisconnect = useCallback(async () => {
    if (!publicKey || !wallet) return;

    try {
      await disconnect();
      console.log({
        status: 'warning',
        method: 'disconnect',
        message: '👋',
      });
    } catch (error) {
      console.log({
        status: 'error',
        method: 'disconnect',
        // eslint-disable-next-line
        // @ts-ignore
        message: error.message,
      });
    }
  }, [disconnect, publicKey, wallet]);

  const connectedMethods = useMemo(() => {
    return [
      // {
      //   name: 'Sign Message',
      //   onClick: handleSignMessage,
      // },
      {
        name: 'Sign In',
        onClick: handleSignIn,
      },
      {
        name: 'Connect',
        onClick: handleConnect
      },
      // {
      //   name: 'Sign In Error',
      //   onClick: handleSignInError,
      // },
      {
        name: 'Disconnect',
        onClick: handleDisconnect,
      },
    ];
  }, [
    // handleSignMessage,
    handleSignIn,
    handleConnect,
    // handleSignInError,
    handleDisconnect,
  ]);

  return {
    publicKey,
    connectedMethods,
    handleSignIn,
    handleConnect,
    handleDisconnect,
  };
};

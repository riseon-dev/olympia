import {useWallet} from '@solana/wallet-adapter-react';
import {useCallback, useMemo} from 'react';
import {createSignInData} from '../utils/createSignInData.ts';

export const useWalletMethods = () => {

  const { wallet, publicKey, signIn } = useWallet();
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
    const signInData = await createSignInData();

    try {
      // eslint-disable-next-line
      // @ts-ignore
      const {account, signedMessage, signature} = await signIn(signInData);

      console.log({
        status: 'success',
        method: 'signIn',
        message: `Message signed: ${JSON.stringify(signedMessage)} by ${account.address} with signature ${JSON.stringify(signature)}`,
      });
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
  // const handleConnect = useCallback(async () => {
  //   if (!publicKey || !wallet) return;
  //
  //   try {
  //     await connect();
  //   } catch (error) {
  //     console.log({
  //       status: 'error',
  //       method: 'connect',
  //       // eslint-disable-next-line
  //       // @ts-ignore
  //       message: error.message,
  //     });
  //   }
  // }, [connect, publicKey, wallet]);

  /** Disconnect */
  // const handleDisconnect = useCallback(async () => {
  //   if (!publicKey || !wallet) return;
  //
  //   try {
  //     await disconnect();
  //     console.log({
  //       status: 'warning',
  //       method: 'disconnect',
  //       message: '👋',
  //     });
  //   } catch (error) {
  //     console.log({
  //       status: 'error',
  //       method: 'disconnect',
  //       // eslint-disable-next-line
  //       // @ts-ignore
  //       message: error.message,
  //     });
  //   }
  // }, [disconnect, publicKey, wallet]);

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
      // {
      //   name: 'Connect',
      //   onClick: handleConnect
      // },
      // {
      //   name: 'Sign In Error',
      //   onClick: handleSignInError,
      // },
      // {
      //   name: 'Disconnect',
      //   onClick: handleDisconnect,
      // },
    ];
  }, [
    // handleSignMessage,
    handleSignIn,
    // handleSignInError,
    // handleDisconnect,
  ]);

  return {
    publicKey,
    connectedMethods,
  }
}
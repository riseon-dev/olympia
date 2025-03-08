import React from 'react';

// Default styles that can be overridden by your app

import Bar from '../Bar';
import {useWalletMethods} from '../../hooks/use-wallet-methods.ts';

export const StatelessApp = (): React.ReactElement => {

  const { publicKey, connectedMethods } = useWalletMethods();

  return (
    <div>
      <Bar publicKey={publicKey} connectedMethods={connectedMethods} />
    </div>
  );
}

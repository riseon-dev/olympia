import React from 'react';
import {ConnectedMethods} from '../../utils/connectMethods.ts';
import ConnectButton from '../ConnectButton';

export type BarProps = {
  publicKey: string;
  connectedMethods: ConnectedMethods [];
}

const Bar = (props: BarProps): React.ReactElement => {
  const { publicKey, connectedMethods } = props;

  return (
    <div>
      {publicKey ? (
        <>
        // connected
        {connectedMethods.map((method, i) => (
            <ConnectButton name={`${method.name}`} key={`${method.name}-${i}`} onClick={method.onClick} />
          ))}
        </>
        ) : (
        // not connected
        <></>
      )}
    </div>
  );
};

export default Bar;
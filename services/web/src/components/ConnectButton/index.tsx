import React from 'react';
import { Button } from '@olympia/ui/src/components/ui/button.tsx';

type ReactText = string | number;

export type SignInButtonProps = {
  name: ReactText;
  key: ReactText;
  onClick: () => void;
}

const ConnectButton = (props: SignInButtonProps): React.ReactElement => {

  const { onClick, name, key } = props;

  return (
    <div>
      <Button onClick={onClick} variant={'default'} key={key}>{name}</Button>
    </div>
  );
};

export default ConnectButton;
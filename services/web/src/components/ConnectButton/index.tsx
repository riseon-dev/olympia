import React from 'react';

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
      <button onClick={onClick} type={'button'} key={key}>{name}</button>
    </div>
  );
};

export default ConnectButton;
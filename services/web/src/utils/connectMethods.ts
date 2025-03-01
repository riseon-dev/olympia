export type ConnectedMethods =
  | {
  name: string;
  onClick: () => Promise<string>;
}
  | {
  name: string;
  onClick: () => Promise<void>;
};


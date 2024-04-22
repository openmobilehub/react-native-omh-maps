export type OmhMapsCoreModuleFunctionWithoutViewRef<T> = T extends (
  viewRef: number,
  ...args: infer OtherArgs
) => any
  ? (...args: OtherArgs) => ReturnType<T>
  : T;

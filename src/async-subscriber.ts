export type AsyncSubscriber = (
  data: unknown | undefined,
) => Promise<void> | void;

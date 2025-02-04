export type AsyncGlobalSubscriber = (
  eventName: string,
  data: unknown | undefined,
) => Promise<void> | void;

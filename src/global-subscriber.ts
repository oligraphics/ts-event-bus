export type GlobalSubscriber = (
  eventName: string,
  data?: unknown | undefined,
) => void;

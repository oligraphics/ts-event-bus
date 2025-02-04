import { AsyncSubscriber } from './async-subscriber';

export type AsyncGenericSubscriber<T> = ((data: T) => Promise<void> | void) &
  AsyncSubscriber;

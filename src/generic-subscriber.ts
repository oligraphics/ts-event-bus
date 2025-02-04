import { Subscriber } from './subscriber';

export type GenericSubscriber<T> = ((data: T) => void) & Subscriber;

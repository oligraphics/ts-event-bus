import { AsyncSubscriber } from './async-subscriber';
import { AsyncGenericSubscriber } from './async-generic-subscriber';

export class AsyncEventBus {
  events: Map<string, AsyncSubscriber[]> = new Map();

  on<T>(eventName: string, fn: AsyncGenericSubscriber<T>) {
    const list = this.events.get(eventName);
    if (list) {
      list.push(fn);
    } else {
      this.events.set(eventName, [fn]);
    }
  }

  off(eventName: string, fn: AsyncSubscriber) {
    const list = this.events.get(eventName);
    if (list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] === fn) {
          list.splice(i, 1);
          break;
        }
      }
    }
  }

  async trigger<T>(eventName: string, data?: T) {
    const list = this.events.get(eventName);
    if (list) {
      for (const subscriber of list) {
        try {
          await subscriber(data);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}

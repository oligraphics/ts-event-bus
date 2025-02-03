import { AsyncSubscriber } from './async-subscriber';
import { AsyncGenericSubscriber } from './async-generic-subscriber';
import { AsyncGlobalSubscriber } from './async-global-subscriber';

export class AsyncEventBus {
  private readonly events: Map<string, AsyncSubscriber[]> = new Map();
  private readonly globalEvents: AsyncGlobalSubscriber[] = [];

  onAny(fn: AsyncGlobalSubscriber) {
    this.globalEvents.push(fn);
  }

  offAny(fn: AsyncGlobalSubscriber) {
    const index = this.globalEvents.indexOf(fn);
    if (index >= 0) {
      this.globalEvents.splice(index, 1);
    }
  }

  on<T>(eventName: string, fn: AsyncGenericSubscriber<T>) {
    const list = this.events.get(eventName);
    if (list) {
      list.push(fn as AsyncSubscriber);
    } else {
      this.events.set(eventName, [fn as AsyncSubscriber]);
    }
  }

  off<T>(eventName: string, fn: AsyncGenericSubscriber<T>) {
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
    for (const subscriber of this.globalEvents) {
      try {
        await subscriber(eventName, data);
      } catch (e) {
        console.error(e);
      }
    }
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

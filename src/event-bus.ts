import { Subscriber } from './subscriber';
import { GenericSubscriber } from './generic-subscriber';
import { GlobalSubscriber } from './global-subscriber';

export class EventBus {
  private readonly events: Map<string, Subscriber[]> = new Map();
  private readonly globalEvents: GlobalSubscriber[] = [];

  onAny(fn: GlobalSubscriber) {
    this.globalEvents.push(fn);
  }

  offAny(fn: GlobalSubscriber) {
    const index = this.globalEvents.indexOf(fn);
    if (index >= 0) {
      this.globalEvents.splice(index, 1);
    }
  }

  on<T>(eventName: string, fn: GenericSubscriber<T>) {
    const list = this.events.get(eventName);
    if (list) {
      list.push(fn as Subscriber);
    } else {
      this.events.set(eventName, [fn as Subscriber]);
    }
  }

  off<T>(eventName: string, fn: GenericSubscriber<T>) {
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

  trigger<T>(eventName: string, data?: T) {
    for (const subscriber of this.globalEvents) {
      try {
        subscriber(eventName, data);
      } catch (e) {
        console.error(e);
      }
    }
    const list = this.events.get(eventName);
    if (list) {
      list.forEach(function (fn: GenericSubscriber<T>) {
        try {
          fn(data);
        } catch (e) {
          console.error(e);
        }
      });
    }
  }
}

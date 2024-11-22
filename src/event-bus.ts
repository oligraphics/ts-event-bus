import { Subscriber } from './subscriber';
import { GenericSubscriber } from './generic-subscriber';

export class EventBus {
  events: Map<string, [Subscriber]> = new Map();

  on<T>(eventName: string, fn: GenericSubscriber<T>) {
    const list = this.events.get(eventName);
    if (list) {
      list.push(fn);
    } else {
      this.events.set(eventName, [fn]);
    }
  }

  off(eventName: string, fn: Subscriber) {
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

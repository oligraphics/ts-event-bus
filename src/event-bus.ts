import { Subscriber } from './subscriber';
import { GenericSubscriber } from './generic-subscriber';
import { GlobalSubscriber } from './global-subscriber';

export class EventBus {
  private readonly events: Map<string, Subscriber[]> = new Map();
  private readonly globalEvents: GlobalSubscriber[] = [];

  name = 'EventBus';
  debug: string | boolean = false;

  onAny(fn: GlobalSubscriber) {
    this.globalEvents.push(fn);
    if (this.debug === true) {
      console.log(this.name, '+', 'global listener');
      console.log(this.name, this.globalEvents.length, 'global listeners');
    }
  }

  offAny(fn: GlobalSubscriber) {
    const index = this.globalEvents.indexOf(fn);
    if (index >= 0) {
      this.globalEvents.splice(index, 1);
    }
    if (this.debug === true) {
      console.log(this.name, '-', 'global listener');
      console.log(this.name, this.globalEvents.length, 'global listeners');
    }
  }

  on<T>(eventName: string, fn: GenericSubscriber<T>) {
    const list = this.events.get(eventName);
    if (list) {
      list.push(fn);
    } else {
      this.events.set(eventName, [fn]);
    }
    if (this.debug === eventName) {
      console.log(this.name, '+', eventName, 'listener');
      console.log(this.name, list?.length ?? 1, eventName, 'listeners');
    }
  }

  off<T>(eventName: string, fn: GenericSubscriber<T>) {
    const list = this.events.get(eventName);
    if (list) {
      const index = list.indexOf(fn);
      if (index >= 0) {
        list.splice(index, 1);
      }
    }
    if (this.debug === eventName) {
      console.log(this.name, '-', eventName, 'listener');
      console.log(this.name, list?.length ?? 0, eventName, 'listeners');
    }
  }

  trigger<T>(eventName: string, data?: T) {
    if (this.debug === true) {
      console.log(this.name, 'trigger', eventName);
      console.log(this.name, this.globalEvents.length, 'global listeners');
    }
    for (const subscriber of this.globalEvents) {
      try {
        subscriber(eventName, data);
      } catch (e) {
        console.error(e);
      }
    }
    const list = this.events.get(eventName);
    if (this.debug === eventName) {
      console.log(this.name, 'trigger', eventName);
      console.log(this.name, list?.length ?? 0, eventName, 'listeners');
    }
    if (list && list.length > 0) {
      const listCopy = [...list];
      for (let i = 0; i < listCopy.length; i++) {
        if (this.debug === eventName) {
          console.log(this.name, 'Call', eventName, 'listener', i);
        }
        const subscriber = listCopy[i];
        try {
          subscriber(data as T);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}

import { AsyncSubscriber } from './async-subscriber';
import { AsyncGenericSubscriber } from './async-generic-subscriber';
import { AsyncGlobalSubscriber } from './async-global-subscriber';

export class AsyncEventBus {
  private readonly events: Map<string, AsyncSubscriber[]> = new Map();
  private readonly globalEvents: AsyncGlobalSubscriber[] = [];

  name = 'AsyncEventBus';
  debug: string | boolean = false;

  onAny(fn: AsyncGlobalSubscriber) {
    this.globalEvents.push(fn);
    if (this.debug === true) {
      console.log(this.name, '+', 'global listener');
      console.log(this.name, this.globalEvents.length, 'global listeners');
    }
  }

  offAny(fn: AsyncGlobalSubscriber) {
    const index = this.globalEvents.indexOf(fn);
    if (index >= 0) {
      this.globalEvents.splice(index, 1);
    }
    if (this.debug === true) {
      console.log(this.name, '-', 'global listener');
      console.log(this.name, this.globalEvents.length, 'global listeners');
    }
  }

  on<T>(eventName: string, fn: AsyncGenericSubscriber<T>) {
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

  off<T>(eventName: string, fn: AsyncGenericSubscriber<T>) {
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

  async trigger<T>(eventName: string, data?: T) {
    if (this.debug === true) {
      console.log(this.name, 'trigger', eventName);
      console.log(this.name, this.globalEvents.length, 'global listeners');
    }
    for (const subscriber of this.globalEvents) {
      try {
        await subscriber(eventName, data);
      } catch (e) {
        console.error(e);
      }
    }
    const list = this.events.get(eventName);
    if (this.debug === eventName) {
      console.log(this.name, 'trigger', eventName);
      console.log(this.name, list?.length ?? 0, eventName, 'listeners');
    }
    if (list) {
      for (let i = 0; i < list.length; i++) {
        if (this.debug === eventName) {
          console.log(this.name, 'Call', eventName, 'listener', i);
        }
        const subscriber = list[i];
        try {
          await subscriber(data as T);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}

import { Subscriber } from './subscriber';
import { GenericSubscriber } from './generic-subscriber';
export declare class EventBus {
    events: Map<string, [Subscriber]>;
    on<T>(eventName: string, fn: GenericSubscriber<T>): void;
    off(eventName: string, fn: Subscriber): void;
    trigger<T>(eventName: string, data?: T): void;
}
//# sourceMappingURL=event-bus.d.ts.map
import { Subscriber } from './subscriber';
import { GenericSubscriber } from './generic-subscriber';
import { GlobalSubscriber } from './global-subscriber';
export declare class EventBus {
    private readonly events;
    private readonly globalEvents;
    onAny(fn: GlobalSubscriber): void;
    offAny(fn: GlobalSubscriber): void;
    on<T>(eventName: string, fn: GenericSubscriber<T>): void;
    off(eventName: string, fn: Subscriber): void;
    trigger<T>(eventName: string, data?: T): void;
}
//# sourceMappingURL=event-bus.d.ts.map
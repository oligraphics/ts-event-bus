import { GenericSubscriber } from './generic-subscriber';
import { GlobalSubscriber } from './global-subscriber';
export declare class EventBus {
    private readonly events;
    private readonly globalEvents;
    name: string;
    debug: string | boolean;
    onAny(fn: GlobalSubscriber): void;
    offAny(fn: GlobalSubscriber): void;
    on<T>(eventName: string, fn: GenericSubscriber<T>): void;
    off<T>(eventName: string, fn: GenericSubscriber<T>): void;
    trigger<T>(eventName: string, data?: T): void;
}
//# sourceMappingURL=event-bus.d.ts.map
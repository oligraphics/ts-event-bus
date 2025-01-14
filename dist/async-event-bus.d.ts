import { AsyncSubscriber } from './async-subscriber';
import { AsyncGenericSubscriber } from './async-generic-subscriber';
export declare class AsyncEventBus {
    events: Map<string, AsyncSubscriber[]>;
    on<T>(eventName: string, fn: AsyncGenericSubscriber<T>): void;
    off(eventName: string, fn: AsyncSubscriber): void;
    trigger<T>(eventName: string, data?: T): Promise<void>;
}
//# sourceMappingURL=async-event-bus.d.ts.map
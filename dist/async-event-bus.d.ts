import { AsyncSubscriber } from './async-subscriber';
import { AsyncGenericSubscriber } from './async-generic-subscriber';
import { AsyncGlobalSubscriber } from './async-global-subscriber';
export declare class AsyncEventBus {
    private readonly events;
    private readonly globalEvents;
    onAny(fn: AsyncGlobalSubscriber): void;
    offAny(fn: AsyncGlobalSubscriber): void;
    on<T>(eventName: string, fn: AsyncGenericSubscriber<T>): void;
    off(eventName: string, fn: AsyncSubscriber): void;
    trigger<T>(eventName: string, data?: T): Promise<void>;
}
//# sourceMappingURL=async-event-bus.d.ts.map
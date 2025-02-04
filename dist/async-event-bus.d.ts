import { AsyncGenericSubscriber } from './async-generic-subscriber';
import { AsyncGlobalSubscriber } from './async-global-subscriber';
export declare class AsyncEventBus {
    private readonly events;
    private readonly globalEvents;
    name: string;
    debug: boolean;
    onAny(fn: AsyncGlobalSubscriber): void;
    offAny(fn: AsyncGlobalSubscriber): void;
    on<T>(eventName: string, fn: AsyncGenericSubscriber<T>): void;
    off<T>(eventName: string, fn: AsyncGenericSubscriber<T>): void;
    trigger<T>(eventName: string, data?: T): Promise<void>;
}
//# sourceMappingURL=async-event-bus.d.ts.map
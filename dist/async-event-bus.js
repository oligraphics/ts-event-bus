"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncEventBus = void 0;
class AsyncEventBus {
    events = new Map();
    on(eventName, fn) {
        const list = this.events.get(eventName);
        if (list) {
            list.push(fn);
        }
        else {
            this.events.set(eventName, [fn]);
        }
    }
    off(eventName, fn) {
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
    async trigger(eventName, data) {
        const list = this.events.get(eventName);
        if (list) {
            for (const subscriber of list) {
                try {
                    await subscriber(data);
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
    }
}
exports.AsyncEventBus = AsyncEventBus;
//# sourceMappingURL=async-event-bus.js.map
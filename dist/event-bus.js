"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
class EventBus {
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
    trigger(eventName, data) {
        const list = this.events.get(eventName);
        if (list) {
            list.forEach(function (fn) {
                try {
                    fn(data);
                }
                catch (e) {
                    console.error(e);
                }
            });
        }
    }
}
exports.EventBus = EventBus;
//# sourceMappingURL=event-bus.js.map
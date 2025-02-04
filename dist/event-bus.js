"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
class EventBus {
    events = new Map();
    globalEvents = [];
    onAny(fn) {
        this.globalEvents.push(fn);
    }
    offAny(fn) {
        const index = this.globalEvents.indexOf(fn);
        if (index >= 0) {
            this.globalEvents.splice(index, 1);
        }
    }
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
            const index = list.indexOf(fn);
            if (index >= 0) {
                list.splice(index, 1);
            }
        }
    }
    trigger(eventName, data) {
        for (const subscriber of this.globalEvents) {
            try {
                subscriber(eventName, data);
            }
            catch (e) {
                console.error(e);
            }
        }
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
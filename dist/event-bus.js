"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
class EventBus {
    events = new Map();
    globalEvents = [];
    name = 'EventBus';
    debug = false;
    onAny(fn) {
        this.globalEvents.push(fn);
        if (this.debug === true) {
            console.log(this.name, '+', 'global listener');
            console.log(this.name, this.globalEvents.length, 'global listeners');
        }
    }
    offAny(fn) {
        const index = this.globalEvents.indexOf(fn);
        if (index >= 0) {
            this.globalEvents.splice(index, 1);
        }
        if (this.debug === true) {
            console.log(this.name, '-', 'global listener');
            console.log(this.name, this.globalEvents.length, 'global listeners');
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
        if (this.debug === eventName) {
            console.log(this.name, '+', eventName, 'listener');
            console.log(this.name, list?.length ?? 1, eventName, 'listeners');
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
        if (this.debug === eventName) {
            console.log(this.name, '-', eventName, 'listener');
            console.log(this.name, list?.length ?? 0, eventName, 'listeners');
        }
    }
    trigger(eventName, data) {
        if (this.debug === true) {
            console.log(this.name, 'trigger', eventName);
            console.log(this.name, this.globalEvents.length, 'global listeners');
        }
        for (const subscriber of this.globalEvents) {
            try {
                subscriber(eventName, data);
            }
            catch (e) {
                console.error(e);
            }
        }
        const list = this.events.get(eventName);
        if (this.debug === eventName) {
            console.log(this.name, 'trigger', eventName);
            console.log(this.name, list?.length ?? 0, eventName, 'listeners');
        }
        if (list && list.length > 0) {
            const listCopy = [...list];
            for (let i = 0; i < listCopy.length; i++) {
                if (this.debug === eventName) {
                    console.log(this.name, 'Call', eventName, 'listener', i);
                }
                const subscriber = listCopy[i];
                try {
                    subscriber(data);
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
    }
}
exports.EventBus = EventBus;
//# sourceMappingURL=event-bus.js.map
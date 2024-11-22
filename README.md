# Event Bus

Simple event bus class to set up event listeners.

```ts
// Create a bus
const bus = new EventBus();

// Create a listener
const listener = (params) => {
  // do something
};

// Register the listener
bus.on('whatever', listener);

// Trigger an event
// Providing a data argument is optional
bus.trigger('whatever', {
  doWhatever: true
});

// Unregister the listener
bus.off('whatever', listener);
```
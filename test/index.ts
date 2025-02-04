import { AsyncEventBus } from '../src';

const bus = new AsyncEventBus();
bus.debug = true;
bus.on('test', async () => {
  return new Promise(resolve => {
    console.log('Hello World!');
    setTimeout(() => resolve(), 1000);
  });
});
const releasableHook = () => {
  console.log('I will not be called!');
};
bus.on('test', releasableHook);
bus.on('test', async () => {
  console.log('Second Hello World!');
});

bus.off('test', releasableHook);

const testFunction = async () => {
  await bus.trigger('test');
};

testFunction().then(() => console.log('Done!')).catch(console.error);
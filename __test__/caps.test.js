'use strict';

const events = require('../events');
require('../caps');
require('../driver');


let item = {

  event: 'pickup',
  time: '2020-09-26T22:59:54.677Z',
  payload:
    {
      store: 'Candy',
      orderID: 'c3eec411-562e-4dcb-856a-067e745d312c',
      firstName: 'Bertram',
      address: 'Loweside',
    },


};

it('should log pickup', () => {
  console.log = jest.fn();
  events.emit('pickup', item);
  expect(console.log).toHaveBeenCalledTimes(1);
});
it('should log in-transit', () => {
  console.log = jest.fn();
  events.emit('in-transit', item);
  expect(console.log).toHaveBeenCalledTimes(1);
});
it('should log delivered', () => {
  console.log = jest.fn();
  events.emit('delivered', item);
  expect(console.log).toHaveBeenCalledTimes(2);
});
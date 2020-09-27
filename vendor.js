'use strict';
const faker = require('faker');
require('dotenv').config();
const events = require('./events');
events.on('order', handleOrder);
function Event(eventType){
  this.event = eventType;
  this.time =  faker.date.recent();
  this.payload = new Payload;
}
function Payload(){
  this.store = process.env.STORE_NAME;
  this.orderID = faker.random.uuid();
  this.firstName = faker.name.firstName();
  this.address = faker.address.city();
}
events.on('pickup', handlePickUp);
function handlePickUp(item) {
  console.log(item);
  return item;
}
function handleOrder(){
  let item = new Event('pickup');
  setTimeout(() => {
    console.log(`Driver: picked up ${item.payload.orderID}`);
    item.event = 'in-transit';
    events.emit('in-transit', item);
  }, 1000);
  //     setTimeout(() =>{console.log(`Driver: picked up ${item.payload.orderID}`),1000})
  events.emit('pickup', item);
}
// handleOrder();
setInterval(handleOrder,5000);
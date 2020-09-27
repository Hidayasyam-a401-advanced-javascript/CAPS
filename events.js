'use strict';
const events = require('events');
const newEvents = new events();
// I am exporting the same instance
// same events pool is exported
module.exports = newEvents;
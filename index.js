var requestAnimationFrame = require('raf-component');
var contains = require('contains');
var element = require('tiny-element');

var defaultContext = document.body;
var elementAddedQueue = []; // track added items
var elementRemovedQueue = []; // track removed items
var notifiers = []; // Track notifiers so we don't duplicate them

var notifier = function (selector) {
  return notifiers[selector] || (notifiers[selector] = new TrackedElement(selector));
};


//
var elementAdded = function () {
  elementChanged(elementAddedQueue, function (oldLen, newLen) {
    return oldLen < newLen;
  }, elementAdded);
};

var elementRemoved = function () {
  elementChanged(elementRemovedQueue, function (oldLen, newLen) {
    return oldLen > newLen;
  }, elementRemoved);
};

var elementChanged = function (queue, comparator, callback) {
  for (var i in queue) {
    var el = queue[i];
    var els = element(el.selector, true);
    
    if (comparator(el.length, els.length)) el.fn(els);
    
    el.length = els.length;
  }
  
  if (queue.length) requestAnimationFrame(callback);
};


//
TrackedElement = function (selector) {
  this.selector = selector;
};

TrackedElement.prototype.added = function (fn) {
  var els = element(this.selector, true);
  
  if (els.length) return fn(els);
  
  elementAddedQueue.push({
    selector: this.selector,
    fn: fn,
    length: els.length
  });
  
  if (elementAddedQueue.length) requestAnimationFrame(elementAdded);
  
  return this;
};

TrackedElement.prototype.removed = function (fn) {
  var els = element(this.selector, true);
  
  elementRemovedQueue.push({
    selector: this.selector,
    fn: fn,
    length: els.length
  });
  
  if (elementRemovedQueue.length) requestAnimationFrame(elementRemoved);
  
  return this;
};

module.exports = notifier;


var requestAnimationFrame = require('raf-component');
var contains = require('contains');
var element = require('tiny-element');

var defaultContext = document.body;
var elementAddedQueue = [];
var elementRemovedQueue = [];

var notifier = function (selector) {
  return new TrackedElement(selector);
};

var elementAdded = function () {
  for (var i in elementAddedQueue) {
    var el = elementAddedQueue[i];
    var els = element(el.selector, true);
    
    if (el.length < els.length) {
      el.fn(els);
    }
    
    // Set the DOm element length
    el.length = length;
  }
  
  if (elementAddedQueue.length) requestAnimationFrame(elementAdded);
};

var elementRemoved = function () {
  for (var i in elementRemovedQueue) {
    var el = elementRemovedQueue[i];
    var length = element(el.selector, true).length;
    
    // Was one removed?
    if (el.length > length) {
      el.fn();
    }
    
    // Set the DOm element length
    el.length = length; 
  }
  
  if (elementRemovedQueue.length) requestAnimationFrame(elementRemoved);
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
};

TrackedElement.prototype.removed = function (fn) {
  var els = element(this.selector, true);
  
  elementRemovedQueue.push({
    selector: this.selector,
    fn: fn,
    length: els.length
  });
  
  if (elementRemovedQueue.length) requestAnimationFrame(elementRemoved);
};

module.exports = notifier;


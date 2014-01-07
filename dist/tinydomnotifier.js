!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.tinyDomNotifier=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var requestAnimationFrame = require('raf-component');
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


},{"raf-component":2,"tiny-element":3}],2:[function(require,module,exports){
/**
 * Expose `requestAnimationFrame()`.
 */

exports = module.exports = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || fallback;

/**
 * Fallback implementation.
 */

var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime();
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  prev = curr;
  return req;
}

/**
 * Cancel.
 */

var cancel = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
  || window.mozCancelAnimationFrame
  || window.oCancelAnimationFrame
  || window.msCancelAnimationFrame
  || window.clearTimeout;

exports.cancel = function(id){
  cancel.call(window, id);
};

},{}],3:[function(require,module,exports){
var slice = [].slice;
var ctx = document;

module.exports = function (selector, multiple) {
  return (typeof selector == 'string')
    ? (multiple) ? slice.call(ctx.querySelectorAll(selector), 0) : ctx.querySelector(selector)
    : (selector.length) ? slice.call(selector, 0) : selector;
};
},{}]},{},[1])
(1)
});
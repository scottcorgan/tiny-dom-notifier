var notifier = require('../index.js');
var test = require('tape');
var dom = require('tiny-dom');
var element = require('tiny-element');

test('executes callback if DOM element already exists', function (t) {
  document.body.appendChild(dom('<div class="test1"></div>'));
  
  notifier('.test1')
    .added(function (elements) {
      t.ok(element('.test1'), 'element was already there');
      t.end();
    });
});

test('executes callback when DOM element is added', function (t) {
  notifier('#test2')
    .added(function () {
      t.ok(element('#test2'), 'element was added');
      t.end();
    });
  
  setTimeout(function () {
    document.body.appendChild(dom('<div id="test2"></div>'));
  }, 0);
});

test('executes callback when DOM element is removed', function (t) {
  document.body.appendChild(dom('<div id="test3"></div>'));
  
  notifier('#test3')
    .removed(function () {
      t.notOk(element('#test3'), 'element removed');
      t.end();
    });
  
  setTimeout(function () {
    document.body.removeChild(element('#test3'));
  }, 0);
});

test('delets remove callback', function (t) {
  // notifier("#test5").remove(function () {}).cancel();
  t.end();
});
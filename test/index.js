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
  var calls = 0;
  
  notifier('.test2')
    .added(function () {
      t.ok(element('.test2'), 'element was added');
      calls += 1;
      
      setTimeout(function () {
        t.equal(calls, 1, '1 element were added');
        t.end();
      }, 0);
    });
  
  setTimeout(function () {
    document.body.appendChild(dom('<div class="test2"></div>'));
  }, 0);
});

test('executes callback when DOM element is removed', function (t) {
  var calls = 0;
  
  document.body.appendChild(dom('<div class="test3"></div>'));
  
  notifier('.test3')
    .removed(function () {
      calls += 1;
      
      t.notOk(element('#test3'), 'element removed');
    })
    .removed(function (elements) {
      calls += 1;
      
      setTimeout(function () {
        t.equal(calls, 2, 'called both callbacks');
        t.end();
      }, 0);
    });
  
  setTimeout(function () {
    document.body.removeChild(element('.test3'));
  }, 0);
});

// test('cancels "removed" listener', function (t) {
//   var calls = 0;
  
//   notifier("#test5").on('removed', function () {
    
//   });
  
//   notifier('#test5').cancel('removed');
  
//   t.end();
// });
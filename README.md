# tiny-dom-notifier
 
Get notified when certain DOM elements are created or removed. Works as a standalone script or with [Browserify](http://browserify.org).

[![browser support](https://ci.testling.com/scottcorgan/tiny-dom-notifier.png)](https://ci.testling.com/scottcorgan/tiny-dom-notifier)
 
## Install

NPM

```
npm install tiny-dom-notifier --save
```
 
Bower

```
bower install tiny-dom-notifier --save
```

## Usage

Browser

```js
var notifier = window.tinyDomNotifier;

notifier('.some-element')
  .added(function (elements) {
    
  })
  .removed(function (elements) {
    
  });
```


[Browserify](http://browserify.org)

```js
var notifier = require('tiny-dom-notifier');

notifier('.some-element')
  .added(function (elements) {
    
  })
  .removed(function (elements) {
    
  });
```

## Methods

### added(callback)

* `callback` - the function to execute when a DOM element is added. The callbacked receives an array of the elements as the only argument

### removed(callback)

* `callback` - the function to execute when a DOM element is removed. The callbacked receives an array of the elements as the only argument

## Run Tests
 
Requires [Phantomjs](http://phantomjs.org/download.html) is installed
 
```
npm install
npm test
```

## Build

```
npm install
npm run build
```
/* jshint node:true */
'use strict';

var Promise = require('bluebird/js/main/bluebird');
var PromisePrototype = Promise.prototype;

var PromiseResolver = require('bluebird/js/main/promise_resolver');
var PromiseResolverPrototype = PromiseResolverPrototype;

/*
 * Define Q as a function
 */
function Q (value) {
  return Promise.resolve(value);
}

/*
 * Copy all of the static functions over as-is
 */
objectAssign(Q, Promise);

/*
 * Alias some things for compatibility for static functions
 */
Q.deferred = Q.defer;

/*
 * Alias some things for compatibility for methods on promise obejcts
 */
PromisePrototype.fail = PromisePrototype.catch;
PromisePrototype.progress = PromisePrototype.progressed;
PromisePrototype.fin = PromisePrototype.finally;
PromisePrototype.allSettled = Promise.all;

/*
 * Define some missing functions
 */
PromisePrototype.post = PromisePrototype.mapply =
  function post (methodName, args) {
    return this.then(function (o) {
      return o[methodName].apply(o, args);
    });
  }; 

PromisePrototype.invoke = function invoke (name) {
  var args = [].slice.call(arguments, 1);
  return this.post(name, args);
};

PromisePrototype.keys = function keys () {
  return this.then(function (o) {
    return Object.keys(o);
  });
};

/*
 * Polyfill for Object.assign()
 */
function objectAssign (target, source) {
  if (Object.assign) {
    return Object.assign(target, source);
    
  } else {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
    return target;
  }
}

function bind(fn, ctx) {
    return function() {
        return fn.apply(ctx, arguments);
    };
}

module.exports = Q;

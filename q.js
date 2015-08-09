/* jshint node:true */
'use strict';

var bluebird = require('bluebird');

function Q (value) {
  return bluebird.resolve(value);
}

/*
 * Use all of the static methods directly from bluebird
 * which do not require renaming or rejiggering
 */
Q.prototype = bluebird;

module.exports = Q;

Q.defer = function() {
    var deferred = {};
    var promise = new bluebird(function(resolve, reject) {
        deferred.resolve = deferred.fulfill = resolve;
        deferred.reject = reject;
    });
    deferred.promise = promise;
    deferred.notify = bind(promise._progress, promise);
    
    deferred.makeNodeResolver = function() {
        return function(err, result) {
            if (err) {
              return deferred.reject(err);
            }
            
            if (arguments.length > 2) {
              return deferred.resolve([].slice.call(arguments, 1));
            } else {
              return deferred.resolve(result);
            }
        };
    };
    return deferred;
};
Q.deferred = Q.pending = Q.defer;

Q.prototype.fail = bluebird.prototype.caught;



function bind(fn, ctx) {
    return function() {
        return fn.apply(ctx, arguments);
    };
}


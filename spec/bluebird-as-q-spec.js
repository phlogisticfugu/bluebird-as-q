/* jshint jasmine:true */

describe('bluebird-as-q', function() {
  var Q = require('../q');
  
  it('should be defined', function() {
    expect(Q).toBeDefined();
  });
  
  it('wraps values like q', function(done) {
    Q('foobar')
    .then(function(value) {
      expect(value).toEqual('foobar');
      done();
    });
  });
  
  it('supports successful deferred resolution', function(done) {
    var deferred = Q.deferred();
    var promise = deferred.promise;
    
    /*
     * Verify core promise methods exist
     * https://github.com/kriskowal/q/wiki/API-Reference#core-promise-methods
     */
    expect(promise.then).toBeDefined('.then() is defined');
    expect(promise.catch).toBeDefined('.catch() is defined');
    expect(promise.fail).toBeDefined('.fail() is defined');
    expect(promise.progress).toBeDefined('.progress() is defined');
    expect(promise.finally).toBeDefined('.finally() is defined');
    expect(promise.fin).toBeDefined('.fin() is defined');
    expect(promise.done).toBeDefined('.done() is defined');
    
    /*
     * verify promise-for-object methods
     * https://github.com/kriskowal/q/wiki/API-Reference#promise-for-object-methods
     */
    expect(promise.get).toBeDefined('.get() is defined');
    expect(promise.post).toBeDefined('.post() is defined');
    expect(promise.mapply).toBeDefined('.mapply() is defined');
    expect(promise.invoke).toBeDefined('.invoke() is defined');
    expect(promise.keys).toBeDefined('.keys() is defined');
    
    expect(promise.allSettled).toBeDefined('.allSettled() is defined');
    
    promise.then(function(value) {
      expect(value).toEqual('success val');
      done();
    });
    
    deferred.resolve('success val');
  });
  
  it('supports rejected deferred resolution', function(done) {
    var deferred = Q.deferred();
    var promise = deferred.promise;
    
    promise.then(null, function(reason) {
      expect(reason).toEqual('failure reason');
      done();
    });
    
    deferred.reject('failure reason');
  });
});

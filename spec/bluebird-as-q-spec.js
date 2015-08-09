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

var Fred = require('../lib/index');
var chai     = require('chai');
var expect   = chai.expect;

describe('Fred', function() {
    describe('init', function() {
        it('should create a new instance of Fred', function() {
            var testApiKey = '12345678901234567890123456789012';
            var testFred = new Fred(testApiKey);

            expect(testFred.apiKey).to.equal(testApiKey);
        });
    });
});
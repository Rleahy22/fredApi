var Fred   = require('../lib/index');
var chai   = require('chai');
var expect = chai.expect;
var testFred;
var testApiKey;

before(function() {
    testApiKey = process.env.FRED_KEY;
    testFred = new Fred(testApiKey);
});

describe('Fred', function() {
    describe('init', function() {
        it('should create a new instance of Fred', function() {
            expect(testFred.apiKey).to.equal(testApiKey);
        });
    });

    describe('get', function() {
        it('should return a success object on succesful request', function(done) {
            var response = testFred.get('releases', {}, function(err, res) {
                expect(err).to.equal(null);
                expect(res.body.releases.length).to.be.above(0);

                done();
            });
        });

        it('should return a succes if no params given', function(done) {
            var response = testFred.get('releases', function(err, res) {
                expect(err).to.equal(null);
                expect(res.body.releases.length).to.be.above(0);

                done();
            });
        });

        it('should error if no callback given', function() {
            expect(testFred.get.bind('releases', {})).to.throw('Callback must be a function');
        });

        it('should successfully handle xml requests', function(done) {
            var response = testFred.get('releases', {file_type: 'xml'}, function(err, res) {
                expect(err).to.equal(null);
                expect(res.body.match(/releases/).length).to.be.above(0);

                done();
            });
        });

        it('should return an error if an xml request errors', function(done) {
            var response = testFred.get('nonexistent', {file_type: 'xml'}, function(err, res) {
                expect(err.status).to.equal('404');
                expect(err.message).to.equal('Not Found');

                done();
            });
        });

        it('should return an error if an xml request errors', function(done) {
            var response = testFred.get('nonexistent', function(err, res) {
                expect(err.status).to.equal(404);
                expect(err.message).to.equal('Not Found');

                done();
            });
        });
    });
});
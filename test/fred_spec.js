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

    describe('Categories', function() {
        describe('getCategory', function() {
            it('should return a category', function(done) {
                testFred.getCategory({category_id: 125}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.categories.length).to.equal(1);

                    done();
                });
            });

            it('should error if not given am integer for category_id', function(done) {
                testFred.getCategory({category_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getCategoryChildren', function() {
            it('should return a category\'s children', function(done) {
                testFred.getCategoryChildren({category_id: 13}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.categories.length).to.be.above(0);

                    done();
                });
            });

            it('should error if not given am integer for category_id', function(done) {
                testFred.getCategoryChildren({category_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getCategoryRelated', function() {
            it('should return a category\'s related categories', function(done) {
                testFred.getCategoryRelated({category_id: 32073}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.categories.length).to.be.above(0);

                    done();
                });
            });

            it('should error if not given am integer for category_id', function(done) {
                testFred.getCategoryRelated({category_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getCategorySeries', function() {
            it('should return the series in a category', function(done) {
                testFred.getCategorySeries({category_id: 125}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.seriess.length).to.be.above(0);

                    done();
                });
            });

            it('should error if not given am integer for category_id', function(done) {
                testFred.getCategorySeries({category_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getCategoryTags', function() {
            it('should return the tags for a category', function(done) {
                testFred.getCategoryTags({category_id: 125}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.tags.length).to.be.above(0);

                    done();
                });
            });

            it('should error if not given am integer for category_id', function(done) {
                testFred.getCategoryTags({category_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getCategoryRelatedTags', function() {
            it('should return the related tags for a category', function(done) {
                testFred.getCategoryRelatedTags({category_id: 125, tag_names: 'services;quarterly'}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.tags.length).to.be.above(0);

                    done();
                });
            });

            it('should error if not given am integer for category_id', function(done) {
                testFred.getCategoryRelatedTags({category_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });
    });
});
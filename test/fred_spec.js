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

            it('should error if not given an integer for category_id', function(done) {
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

            it('should error if not given an integer for category_id', function(done) {
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

            it('should error if not given an integer for category_id', function(done) {
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

            it('should error if not given an integer for category_id', function(done) {
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

            it('should error if not given an integer for category_id', function(done) {
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

            it('should error if not given an integer for category_id', function(done) {
                testFred.getCategoryRelatedTags({category_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });
    });

    describe('Releases', function() {
        describe('getReleases', function() {
            it('should return all releases', function(done) {
                testFred.getReleases({}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.releases.length).to.be.above(0);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getReleases({limit: -1000}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getReleasesDates', function() {
            it('should return all release dates', function(done) {
                testFred.getReleasesDates({}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.release_dates.length).to.be.above(0);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getReleasesDates({limit: -1000}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getRelease', function() {
            it('should return a release', function(done) {
                testFred.getRelease({release_id: 53}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.releases.length).to.be.above(0);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getRelease({release_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getReleaseDates', function() {
            it('should return release dates for a release', function(done) {
                testFred.getReleaseDates({release_id: 82}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.release_dates.length).to.be.above(0);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getReleaseDates({release_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getReleaseSeries', function() {
            it('should return the release series for a release', function(done) {
                testFred.getReleaseSeries({release_id: 51}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.seriess.length).to.be.above(0);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getReleaseSeries({release_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getReleaseSources', function() {
            it('should return the sources for a release', function(done) {
                testFred.getReleaseSources({release_id: 51}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.sources.length).to.be.above(0);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getReleaseSources({release_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getReleaseTags', function() {
            it('should return the sources for a release', function(done) {
                testFred.getReleaseTags({release_id: 86}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.tags.length).to.be.above(0);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getReleaseTags({release_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getReleaseRelatedTags', function() {
            it('should return the sources for a release', function(done) {
                testFred.getReleaseRelatedTags({release_id: 86, tag_names: 'sa;foreign'}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.tags.length).to.be.above(0);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getReleaseRelatedTags({release_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getSeries', function() {
            it('should return a series', function(done) {
                testFred.getSeries({series_id: 'GNPCA'}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.seriess.length).to.equal(1);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getSeries({series_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getSeriesCategories', function() {
            it('should return categories for a series', function(done) {
                testFred.getSeriesCategories({series_id: 'EXJPUS'}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.categories.length).to.be.above(0);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getSeriesCategories({series_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getSeriesObservations', function() {
            it('should return observations for a series', function(done) {
                testFred.getSeriesObservations({series_id: 'EXJPUS'}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.observations.length).to.be.above(0);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getSeriesObservations({series_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getSeriesRelease', function() {
            it('should return a release for a series', function(done) {
                testFred.getSeriesRelease({series_id: 'IRA'}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.releases.length).to.equal(1);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getSeriesRelease({series_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getSeriesSearch', function() {
            it('should return series that relate to a search query', function(done) {
                testFred.getSeriesSearch({search_text: 'monetary,service,index'}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.seriess.length).to.equal(32);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getSeriesSearch({series_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getSeriesSearchTags', function() {
            it('should return tags that relate to a search query', function(done) {
                testFred.getSeriesSearchTags({series_search_text: 'monetary,service,index'}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.tags.length).to.equal(46);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getSeriesSearchTags({series_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getSeriesSearchRelatedTags', function() {
            it('should return related tags that relate to a search query', function(done) {
                testFred.getSeriesSearchRelatedTags({series_search_text: 'mortgage+rate', tag_names:'30-year;frb'}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.tags.length).to.equal(12);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getSeriesSearchRelatedTags({series_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getSeriesTags', function() {
            it('should return tags for a series', function(done) {
                testFred.getSeriesTags({series_id: 'STLFSI'}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.tags.length).to.equal(9);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getSeriesTags({series_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getSeriesUpdates', function() {
            it('should return series in order of recency of updates', function(done) {
                testFred.getSeriesUpdates({}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.seriess.length).to.be.above(1);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getSeriesUpdates({limit: -1000}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getSeriesVintageDates', function() {
            it('should return the dates when changes were made to a series', function(done) {
                testFred.getSeriesVintageDates({series_id: 'GNPCA'}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.vintage_dates.length).to.be.above(1);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getSeriesVintageDates({limit: -1000}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getSources', function() {
            it('should return all sources of economic data', function(done) {
                testFred.getSources({limit: 20}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.sources.length).to.equal(20);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getSources({limit: -1000}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getSource', function() {
            it('should return a source of economic data', function(done) {
                testFred.getSource({source_id: 1}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.sources.length).to.equal(1);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getSource({source_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getSourceReleases', function() {
            it('should return the releases for a source', function(done) {
                testFred.getSourceReleases({source_id: 1}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.releases.length).to.be.above(10);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getSourceReleases({source_id: 'cat'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getTags', function() {
            it('should return FRED tags', function(done) {
                testFred.getTags({limit: 20}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.tags.length).to.equal(20);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getTags({limit: -20}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getRelatedTags', function() {
            it('should return related tags for a tag', function(done) {
                testFred.getRelatedTags({tag_names: 'monetary+aggregates'}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.tags.length).to.be.above(1);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getRelatedTags({tag_names: 'fwfrf'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });

        describe('getTagsSeries', function() {
            it('should return the series matching tag names', function(done) {
                testFred.getTagsSeries({tag_names: 'slovenia;food;oecd'}, function(err, res) {
                    expect(err).to.equal(null);
                    expect(res.seriess.length).to.be.above(0);

                    done();
                });
            });

            it('should error if given an invalid parameter', function(done) {
                testFred.getTagsSeries({tag_names: 'fwfrf'}, function(err, res) {
                    expect(err.status).to.equal(400);
                    expect(err.message).to.match(/Bad Request/);

                    done();
                });
            });
        });
    });
});

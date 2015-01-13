var Fred, http, root;

http = require('http');
root = 'http://api.stlouisfed.org/fred/';

Fred = function(apiKey) {
    'use strict';
    this.apiKey = apiKey;
};

Fred.prototype.get = function(url, params, callback) {
    'use strict';

    var requestUrl, queryString;
    queryString = '?';

    if (typeof params === 'function') {
        callback = params;
        params = {};
    }

    if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
    }

    if (!params.file_type) {
        params.file_type = 'json';
    }

    for (var key in params) {
        queryString += key + '=' + params[key] + '&';
    }

    requestUrl = root + url + queryString + 'api_key=' + this.apiKey;

    http.get(requestUrl, function(response) {
        var body = '';

        response.on('data', function(chunk) {
            body += chunk;
        })
        .on('end', function() {
            var completeResponse, error;

            if (params.file_type === 'xml') {
                completeResponse = body;
                if (completeResponse.match(/error code/)) {
                    var status = completeResponse.match(/error code="\d{3}"/);
                    status = status[0].match(/\d{3}/)[0];

                    var message = completeResponse.match(/message="[A-z0-9 \.]+"/);
                    message = message[0].match(/"[A-z0-9 \.]+/)[0].substring(1);

                    error = {
                        status: status,
                        message: message
                    };

                    return callback(error);
                }
            } else {
                completeResponse = JSON.parse(body);

                if (completeResponse.error_code) {
                    error = {
                        status: completeResponse.error_code,
                        message: completeResponse.error_message
                    };

                    return callback(error);
                }
            }

            return callback(null, {body: completeResponse});
        });
    });
};

Fred.prototype.getCategory = function(params, callback) {
    this.get('category', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getCategoryChildren = function(params, callback) {
    this.get('category/children', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getCategoryRelated = function(params, callback) {
    this.get('category/related', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getCategorySeries = function(params, callback) {
    this.get('category/series', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getCategoryTags = function(params, callback) {
    this.get('category/tags', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getCategoryRelatedTags = function(params, callback) {
    this.get('category/related_tags', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getReleases = function(params, callback) {
    this.get('releases', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getReleasesDates = function(params, callback) {
    this.get('releases/dates', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getRelease = function(params, callback) {
    this.get('release', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getReleaseDates = function(params, callback) {
    this.get('release/dates', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getReleaseSeries = function(params, callback) {
    this.get('release/series', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getReleaseSources = function(params, callback) {
    this.get('release/sources', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getReleaseTags = function(params, callback) {
    this.get('release/tags', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getReleaseRelatedTags = function(params, callback) {
    this.get('release/related_tags', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getSeries = function(params, callback) {
    this.get('series', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getSeriesCategories = function(params, callback) {
    this.get('series/categories', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getSeriesObservations = function(params, callback) {
    this.get('series/observations', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getSeriesRelease = function(params, callback) {
    this.get('series/release', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getSeriesSearch = function(params, callback) {
    this.get('series/search', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getSeriesSearchTags = function(params, callback) {
    this.get('series/search/tags', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getSeriesSearchRelatedTags = function(params, callback) {
    this.get('series/search/related_tags', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getSeriesTags = function(params, callback) {
    this.get('series/tags', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getSeriesUpdates = function(params, callback) {
    this.get('series/updates', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getSeriesVintageDates = function(params, callback) {
    this.get('series/vintagedates', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getSources = function(params, callback) {
    this.get('sources', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getSource = function(params, callback) {
    this.get('source', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getSourceReleases = function(params, callback) {
    this.get('source/releases', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getTags = function(params, callback) {
    this.get('tags', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getRelatedTags = function(params, callback) {
    this.get('related_tags', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

Fred.prototype.getTagsSeries = function(params, callback) {
    this.get('tags/series', params, function(error, response) {
        if (error) {
            callback(error);
        } else {
            callback(null, response.body);
        }
    });
};

module.exports = Fred;
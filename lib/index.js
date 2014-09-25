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

module.exports = Fred;
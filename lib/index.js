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

module.exports = Fred;
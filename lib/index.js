var Fred, root;

root = 'http://api.stlouisfed.org/fred/';

Fred = function(apiKey) {
    'use strict';
    this.apiKey = apiKey;
};

module.exports = Fred;
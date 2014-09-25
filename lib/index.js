var Fred, root;

root = 'http://api.stlouisfed.org/fred';

Fred = function(apiKey) {
    this.apiKey = apiKey;
};

module.exports = Fred;
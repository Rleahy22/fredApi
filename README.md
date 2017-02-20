# Fred

Javascript wrapper for the St. Louis Federal Reserve Economic Data [Fred API](http://api.stlouisfed.org/).

## Installation

   npm install fred-api

## Get a FRED API key

Sign up for a Fred API key: [http://api.stlouisfed.org/api_key.html](http://api.stlouisfed.org/api_key.html)

## Usage

### Instantiate a client

    var Fred = require('fred-api');

    apiKey = process.env.FRED_KEY;
    fred   = new Fred(apiKey);

#### Examples

    fred.getSeries({series_id: 'GNPCA'}, function(error, result) {
        console.log(result)
    });

    >> Result:

    {
        realtime_start: '2015-01-13',
        realtime_end: '2015-01-13',
        seriess: [
            {
                id: 'GNPCA',
                realtime_start: '2015-01-13',
                realtime_end: '2015-01-13',
                title: 'Real Gross National Product',
                observation_start: '1929-01-01',
                observation_end: '2013-01-01',
                frequency: 'Annual',
                frequency_short: 'A',
                units: 'Billions of Chained 2009 Dollars',
                units_short: 'Bil. of Chn. 2009 $',
                seasonal_adjustment: 'Not Seasonally Adjusted',
                seasonal_adjustment_short: 'NSA',
                last_updated: '2014-07-30 10:36:08-05',
                popularity: 25,
                notes: 'BEA Account Code: A001RX1'
            }
        ]
    }

## Copyright

Copyright (c) 2017 Ryan Leahy

## API

# categories

    getCategory
    getCategoryChildren
    getCategoryRelated
    getCategorySeries
    getCategoryTags
    getCategoryRelatedTags

# releases
    getReleases
    getReleasesDates
    getRelease
    getReleaseDates
    getReleaseSeries
    getReleaseSources
    getReleaseTags
    getReleaseRelatedTags

# series
    getSeries
    getSeriesCategories
    getSeriesObservations
    getSeriesRelease
    getSeriesSearch
    getSeriesSearchTags
    getSeriesSearchRelatedTags
    getSeriesTags
    getSeriesUpdates
    getSeriesVintageDates

# sources

    getSources
    getSource
    getSourceReleases

# tags

    getTags
    getRelatedTags
    getTagsSeries

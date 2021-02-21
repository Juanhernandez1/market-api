const config = require('../config/index');
const time = require('./utils/time');

const cache_control = 'Cache-control';
const cacheControlOptions = {
    no_store: 'no-store',
    no_cache: 'no-cache',
    private: 'private',
    public: 'public',
    max_age: 'max-age= '+ time.FIVE_MINUTES_IN_SECONDS
}

function cacheResponse(res) {
    if (config.app.env !== 'dev') {
        res.set(cache_control, cacheControlOptions.private+ ', '+ cacheControlOptions.no_store);
    }
}

module.exports = cacheResponse;
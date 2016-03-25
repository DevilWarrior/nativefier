import {inferUserAgent} from './../../lib/infer/inferUserAgent';
import chai from 'chai';
import _ from 'lodash';

const assert = chai.assert;

const TEST_RESULT = {
    darwin: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36',
    win32: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36',
    linux: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36'
};

function testPlatform(platform) {
    return inferUserAgent('0.37.1', platform)
        .then(userAgent => {
            assert.equal(userAgent, TEST_RESULT[platform], 'Correct user agent should be inferred');
        });
}

describe('Infer User Agent', function() {
    this.timeout(10000);
    it('Can infer userAgent for all platforms', function(done) {
        const testPromises = _.keys(TEST_RESULT).map(platform => {
            return testPlatform(platform);
        });
        Promise
            .all(testPromises)
            .then(() => {
                done();
            })
            .catch(error => {
                done(error);
            });
    });
});


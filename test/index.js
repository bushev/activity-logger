/**
 *
 * Created by Yuriy Bushev <bushevuv@gmail.com> on 26/09/2016.
 */

'use strict';

/**
 * ShouldJS library
 */
const should = require('should');

/**
 * Library
 *
 * @type {ActivityLogger|Function}
 */
const ActivityLogger = require('../index');

describe('Tests', function () {

    it('basic mouse test', done => {

        let activityLogger = new ActivityLogger();

        activityLogger.start();

        console.log(`Please, move mouse to test me!`);

        activityLogger.on('activity', event => {

            event.type.should.be.ok();

            console.log(`Activity detected: ${event.type}`);

            activityLogger.stop();

            done();
        });
    });
});
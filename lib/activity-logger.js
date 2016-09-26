/**
 *
 * Created by Yuriy Bushev <bushevuv@gmail.com> on 26/09/2016.
 */

'use strict';

/**
 * NodeJS EventEmitter
 *
 * @type {EventEmitter}
 */
const EventEmitter = require('events');

/**
 * Mouse activity logger
 *
 * @type {MouseActivityLogger}
 */
const MouseActivityLogger = require('./mouse-activity-logger');

class ActivityLogger extends EventEmitter {

    /**
     * Class constructor
     *
     * @param options
     */
    constructor() {

        super();

        this.mouseActivityLogger = null;
    }

    /**
     * Start activity logging
     */
    start() {

        this.mouseActivityLogger = new MouseActivityLogger({poolTimeout: 1000});

        this.mouseActivityLogger.start();

        this.mouseActivityLogger.on('activity', event => {

            this.emit('activity', {type: 'mouse'});
        });
    }

    /**
     * Stop activity logging
     */
    stop() {

        if (this.mouseActivityLogger) {

            this.mouseActivityLogger.stop();

            this.mouseActivityLogger = null;
        }
    }
}

/**
 * Export class
 *
 * @type {ActivityLogger|Function}
 */
module.exports = ActivityLogger;
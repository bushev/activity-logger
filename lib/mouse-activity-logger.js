/**
 *
 * Created by Yuriy Bushev <bushevuv@gmail.com> on 26/09/2016.
 */

'use strict';

/**
 * Robot JS library
 */
const robot = require('robotjs');

/**
 * NodeJS EventEmitter
 *
 * @type {EventEmitter}
 */
const EventEmitter = require('events');

class MouseActivityLogger extends EventEmitter {

    /**
     * Class constructor
     *
     * @param options
     * @param options.poolTimeout
     */
    constructor(options) {

        super();

        /**
         * Pool timeout
         *
         * @type {number}
         */
        this.poolTimeout = options.poolTimeout || 100;

        /**
         * Interval handle
         *
         * @type {null}
         */
        this.intervalHandle = null;

        /**
         * Current cursor position
         *
         * @type {string}
         */
        this.currentPosition = this.mousePosition;
    }

    /**
     * Get current position from robot js
     */
    get mousePosition() {

        return JSON.stringify(robot.getMousePos());
    }

    /**
     * Start activity tracking
     */
    start() {

        this.intervalHandle = setInterval(() => {

            if (this.checkForActivity()) {

                this.emit('activity', {});
            }

        }, this.poolTimeout);
    }

    /**
     * Stop activity tracking
     */
    stop() {

        if (this.intervalHandle) {

            clearInterval(this.intervalHandle);

            this.intervalHandle = null;
        }
    }

    /**
     * Check for activity
     *
     * @returns {boolean}
     */
    checkForActivity() {

        let currentPosition = this.mousePosition;

        if (this.currentPosition !== currentPosition) {

            this.currentPosition = currentPosition;

            return true;
        }

        return false;
    }
}

/**
 * Export class
 *
 * @type {MouseActivityLogger}
 */
module.exports = MouseActivityLogger;
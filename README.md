# activity-logger

### How to use

```javascript
let activityLogger = new ActivityLogger();

activityLogger.start();

activityLogger.on('activity', event => {

    console.log(`Activity detected: ${event.type}`);
});
```
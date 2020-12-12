const Queue = require('Bull')


class QueueService {

    constructor() {
        this.messageQueue = new Queue('message-queue', { limiter: { 
            max: 100,
            duration: 30000
        }});
    }
}

module.exports = QueueService;
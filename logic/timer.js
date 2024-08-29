class Timer {
    constructor() {
        this.timeRemaining = 13;
        this.timerInterval = null;
    }

    start() {
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            
            if (this.timeRemaining <= 0) {
                this.stop();
            }
        }, 1000);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillText("Timer : " + this.formatTime(this.timeRemaining), 10, 20);
        ctx.closePath(); 
    }

    // format mm:ss
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    stop() {
        clearInterval(this.timerInterval);
    }

    isMissionAccomplished() {
        return this.timeRemaining <= 3;
    }

    update(ctx) {
        this.draw(ctx);
    }
}
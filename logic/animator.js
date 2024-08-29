// controls the overall speed of the animation
class Animator {
    constructor(playSpeed, frameDuration, frames) {
        this.playSpeed = playSpeed;
        this.frameDuration = frameDuration;
        this.frames = frames;
        this.timer = 0;
        this.currentFrameIndex = 0;
    }

    update() {
        this.timer += this.playSpeed;
        if (this.timer >= this.frameDuration) {
            this.timer = 0;
            this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length;
        }
    }

    getCurrentFrame() {
        return this.frames[this.currentFrameIndex];
    }

    reset() {
        this.currentFrameIndex = 0;
    }

    static create(playSpeed, showTime, imageSources) {
        const images = [];
        for (let i = 0; i < imageSources.length; i++) {
            const image = new Image();
            image.src = imageSources[i];
            images.push(image);
        }

        return new Animator(playSpeed, showTime, images);
    }
}
class RunnerGame {
    constructor(id, frameRate, groundOffset, playerOptions, spawnerOptions, difficulty) 
    {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.frameRate = frameRate;
        this.groundY = this.canvas.height - groundOffset;
        this.playerOptions = playerOptions;
        this.spawnerOptions = spawnerOptions;
        this.difficulty = difficulty;
        this.initialize();
    }

    initialize() {
        this.messageArea = document.getElementById("game-message-box");
        this.messageArea.textContent = "";
        this.background = new Background(255, this.canvas.width, this.canvas.height);
        this.player = Player.create(playerOptions, this.groundY);
        this.spawner = Spawner.create(spawnerOptions, this.canvas.width, this.groundY);
        this.speed = 0;
        this.endOftheGame = false;
        this.timer = new Timer();
        this.timer.start();
    }

    start() {
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        this.intervalId = setInterval(this.updateGame.bind(this), this.frameRate);
    }

    handleKeyDown(event) {
        if (event.code == "Space") {
        if (this.endOftheGame) 
            this.initialize();
        else if (this.timer.isMissionAccomplished())
            this.player.stopJumping();
        else 
            this.player.jump();
        }
    }

    updateGame() {
        this.renderScene();

        if (this.endOftheGame) {
            this.timer.stop();
            this.displayOutcomeMessage();
        } else {
            this.increaseDifficulty();

            this.player.update();
            this.timer.update(this.ctx);
            this.spawner.update(this.timer.timeRemaining);

            this.endOftheGame = this.checkPlayerCollision();
        }
    }

    renderScene() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background.draw(this.ctx);
        this.background.drawGround(this.ctx, this.groundY, this.canvas.width);
        this.player.draw(this.ctx);
        this.spawner.draw(this.ctx);
        this.timer.draw(this.ctx);
    }

    increaseDifficulty() {
        if (this.speed < this.difficulty.maxIncreasement) {
            this.speed += this.difficulty.speedIncreasement;
            this.player.movement.jumpPower += this.difficulty.speedIncreasement;
            this.player.movement.gravity += this.difficulty.speedIncreasement;
            this.spawner.speed += this.difficulty.speedIncreasement;
        }
    }

    checkPlayerCollision() {
        return this.player.isCollidingWithOthers(this.spawner.activeObstacles);
    }

    displayOutcomeMessage() {
        const colliderName = this.player.getOverlappingObstacleName(this.spawner.activeObstacles);
        const messageInstance = new Message();
        const message = messageInstance.getMessageForCollider(colliderName);
        this.messageArea.textContent = message;
    }
}

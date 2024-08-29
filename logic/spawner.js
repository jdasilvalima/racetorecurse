class Spawner {
    constructor(obstacles, maxActive, speed, startX, minLength, maxlength) {
        this.obstacles = obstacles;
        this.maxActive = maxActive;
        this.speed = speed;
        this.startX = startX;
        this.minLength = minLength;
        this.maxlength = maxlength;
        this.activeObstacles = [];
        this.inactiveObstacles = [];
        this.lastObstacle = null;
    }

    draw(ctx) {
        for (let i = 0; i < this.activeObstacles.length; i++)
            this.activeObstacles[i].draw(ctx);
    }

    update(timeRemaining) {
        this.moveActiveInteractiveElements();
        this.removeOffscreenInteractiveElements();
        this.handleInteractiveElementSpawning(timeRemaining);
    }

    moveActiveInteractiveElements() {
        for (let i = this.activeObstacles.length - 1; i >= 0; i--) {
            this.activeObstacles[i].position.add(-this.speed, 0);
        }
    }

    removeOffscreenInteractiveElements() {
        this.activeObstacles = this.activeObstacles.filter(obstacle => obstacle.position.x >= 0);
    }

    handleInteractiveElementSpawning(timeRemaining) {
        if (this.shouldSkipSpawning(timeRemaining))
            return;

        if (this.isSpawnLimitReached())
            return;

        if (this.isSpawnDistanceInsufficient())
            return;

        this.inactiveObstacles = this.getAvailableInteractiveElement(timeRemaining);
        if (this.inactiveObstacles.length == 0)
            return;

        this.spawnRandomInteractiveElement();
    }

    shouldSkipSpawning(timeRemaining) {
        return timeRemaining <= 5 && timeRemaining > 2;
    }

    isSpawnLimitReached() {
        return this.activeObstacles.length >= this.maxActive;
    }

    isSpawnDistanceInsufficient() {
        return this.lastObstacle != null &&
               this.lastObstacle.position.x > this.startX - this.nextSpawnLength;
    }

    spawnRandomInteractiveElement() {
        const randomIndex = Math.floor(Math.random() * this.inactiveObstacles.length);
        const obstacleToSpawn = this.inactiveObstacles[randomIndex];
        this.spawnInteractiveElement(obstacleToSpawn);
    }

    spawnInteractiveElement(obstacle) {
        this.lastObstacle = obstacle;
        this.lastObstacle.position.x = this.startX;
        this.activeObstacles.push(obstacle);
        this.nextSpawnLength = this.generateRandomSpawnDistance();
    }

    generateRandomSpawnDistance() {
        return Math.floor(Math.random() * this.maxlength + this.minLength);
    }

    getAvailableInteractiveElement(timeRemaining) {
        const shouldSpawnWinningElement = timeRemaining <= 2;
        return this.obstacles.filter(obstacle => 
            (obstacle.position.x < 0 || obstacle.position.x > this.startX) &&
            (shouldSpawnWinningElement ? !obstacle.isObstacle : obstacle.isObstacle)
        );
    }

    static create(options, startX, groundY) {
        for (let i = 0; i < options.elements.length; i++) {
            options.elements[i].position.x = -1;
            options.elements[i].position.y = groundY - options.elements[i].h;
        }

        return new Spawner(
            options.elements,
            options.maxActive,
            options.speed,
            startX,
            options.minLength,
            options.maxlength);
    }
}
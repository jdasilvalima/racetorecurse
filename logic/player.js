class Player {
    constructor(position, animator, movement, collider) {
        this.position = position;
        this.animator = animator;
        this.movement = movement;
        this.collider = collider;
    }

    update() {
        this.movement.update();
        if (this.movement.isGrounded())
            this.animator.update();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.drawImage(
            this.animator.getCurrentFrame(),
            this.position.x,
            this.position.y,
            this.collider.w,
            this.collider.h
        );
        ctx.closePath();
    }

    jump() {
        if (this.movement.isGrounded()) {
            this.movement.jump();
            this.animator.reset();
        }
    }

    stopJumping() {
        this.movement.isJumping = false;
    }

    isCollidingWithOthers(others) {
        return this.collider.getOverlappingColliderName(others) !== null;
    }

    getOverlappingObstacleName(others) {
        return this.collider.getOverlappingColliderName(others);
    }

    static create(options, groundY) {
        const position = new Point2D(options.startX, groundY);
        const collider = new Collider(position, options.width, options.height);
        const animator = Animator.create(options.playSpeed, options.showTime, options.imageSources);
        const movement = new Movement(position, groundY, options.height, options.jumpPower, options.jumpHeight, options.gravity);
        return new Player(position, animator, movement, collider);
    }
}
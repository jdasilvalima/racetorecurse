// Controls the player’s gravity and jump behaviour
class Movement {
    constructor(position, groundY, height, jumpPower, jumpHeight, gravity) {
        this.position = position;
        this.height = height;
        this.groundY = groundY;
        this.jumpPower = jumpPower;
        this.jumpHeight = jumpHeight;
        this.gravity = gravity;
    }

    update() {
        this.handleJump();
        this.applyGravity();
        this.ensureOnGround();
    }

    handleJump() {
        if (this.isJumping)
            this.position.add(0, -this.jumpPower);

        if (this.position.y <= this.groundY - this.jumpHeight) {
            this.isJumping = false;
        }
    }

    applyGravity() {
        if (!this.isJumping && !this.isGrounded())
            this.position.add(0, this.gravity);
    }

    ensureOnGround() {
        if (this.position.y >= this.groundY - this.height)
            this.position.y = this.groundY - this.height;
    }

    jump() {
        if (this.isGrounded())
            this.isJumping = true;
    }

    isGrounded() {
        return this.position.y == this.groundY - this.height;
    }
}
class Background {
  constructor(max, width, height) {
      this.max = max;
      this.width = width;
      this.height = height;
      this.current = max;
      this.decrease = true;
  }

  draw(ctx) {
      const image = new Image();
      image.src = "./assets/background.png";
      ctx.beginPath();
      ctx.drawImage(image, 0, 0, this.width, this.height);
      ctx.closePath();
  }

  drawGround(ctx, groundY, groundWidth) {
      ctx.beginPath();
      ctx.rect(0, groundY, groundWidth, 3);
      ctx.fill();
      ctx.closePath();
  }
}

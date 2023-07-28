import { spriteSheet } from "./spriteSheet";
import { Animation, runningAnimation } from "./Animation";

export class Actor {
  x = 0;
  y = 0;
  animationTime = 0;
  direction = 5;
  animation: Animation = runningAnimation;

  update(dt: number) {
    this.animationTime += dt;
  }

  draw(time: number, ctx: CanvasRenderingContext2D) {
    const frame =
      globalFrame > 0
        ? globalFrame % this.animation.frames
        : Math.floor(time / this.animation.frameDuration) %
          this.animation.frames;

    ctx.drawImage(
      spriteSheet,
      this.animation.x + this.animation.width * frame,
      this.animation.y + this.animation.height * this.direction,
      this.animation.width,
      this.animation.height,
      this.x,
      this.y,
      this.animation.width,
      this.animation.height
    );

    // write text
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(frame.toString(), this.x, this.y + this.animation.height + 30);
  }
}

let globalFrame = 0;

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") {
    globalFrame++;
  } else if (event.code === "ArrowDown") {
    globalFrame--;
  }
});

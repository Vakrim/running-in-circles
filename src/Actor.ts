import { spriteSheet } from "./spriteSheet";
import { Animation, idleAnimation, runningAnimation, walkingAnimation } from "./Animation";
import { Vector } from "matter-js";

export class Actor {
  #position: Vector = { x: 0, y: 0 };
  draggingPosition: Vector = { x: 0, y: 0 };
  draggingPositionTimestamp = performance.now();
  animationTime = 0;
  direction = 0;
  animation: Animation = runningAnimation;

  update(time: number) {
    this.animationTime += time;
  }

  draw(time: number, ctx: CanvasRenderingContext2D) {
    const frame = this.getFrame(time);

    ctx.drawImage(
      spriteSheet,
      this.animation.x + this.animation.width * frame,
      this.animation.y + this.animation.height * this.direction,
      this.animation.width,
      this.animation.height,
      this.#position.x,
      this.#position.y,
      this.animation.width,
      this.animation.height
    );
  }

  set position(position: Vector) {
    this.#position = position;

    const draggingDiff = Vector.sub(position, this.draggingPosition);
    const timeSinceDraggingUpdate =
      performance.now() - this.draggingPositionTimestamp;

    if (Vector.magnitude(draggingDiff) > 5 || timeSinceDraggingUpdate > 500) {
      this.direction = angleToDirection(
        Math.atan2(draggingDiff.y, draggingDiff.x)
      );

      const velocity =
        (Vector.magnitude(draggingDiff) / timeSinceDraggingUpdate) * 1000;

      if (velocity < 5) {
        this.animation = idleAnimation;
      } else if (velocity < 100) {
        this.animation = walkingAnimation;
      } else {
        this.animation = runningAnimation;
      }

      this.draggingPosition = position;
      this.draggingPositionTimestamp = performance.now();
    }
  }

  get position() {
    return this.#position;
  }

  drawFrameNumber(time: number, ctx: CanvasRenderingContext2D) {
    const frame = this.getFrame(time);

    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(
      frame.toString(),
      this.#position.x,
      this.#position.y + this.animation.height + 30
    );
  }

  getFrame(time: number) {
    return globalFrame > 0
      ? globalFrame % this.animation.frames
      : Math.floor(time / this.animation.frameDuration) % this.animation.frames;
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

function angleToDirection(angle: number) {
  angle += Math.PI / 2;
  while (angle < 0) {
    angle += Math.PI * 2;
  }

  if (angle < Math.PI / 3) {
    return 0;
  } else if (angle < (2 * Math.PI) / 3) {
    return 1;
  } else if (angle < Math.PI) {
    return 2;
  } else if (angle < (4 * Math.PI) / 3) {
    return 3;
  } else if (angle < (5 * Math.PI) / 3) {
    return 4;
  } else {
    return 5;
  }
}

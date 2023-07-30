import { spriteSheet } from "./spriteSheet";
import {
  Animation,
  getAnimationVelocity,
  idleAnimation,
  runningAnimation,
  walkingAnimation,
} from "./Animation";
import { Vector } from "matter-js";

export class Actor {
  #position: Vector = { x: 0, y: 0 };
  lifetime = 0;

  draggingPosition: Vector = { x: 0, y: 0 };
  draggingPositionTimestamp = 0;

  direction = 0;

  animation: Animation = runningAnimation;
  currentFrameTimestamp = 0;
  currentFrame = 0;

  renderedFrame = {
    frame: 0,
    position: { x: 0, y: 0 },
  };

  update(dt: number) {
    this.lifetime += dt;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const frame = this.getFrame();

    if (frame !== this.renderedFrame.frame) {
      this.renderedFrame.frame = frame;
      this.renderedFrame.position = this.#position;
    }

    ctx.drawImage(
      spriteSheet,
      this.animation.x + this.animation.width * this.renderedFrame.frame,
      this.animation.y + this.animation.height * this.direction,
      this.animation.width,
      this.animation.height,
      this.renderedFrame.position.x,
      this.renderedFrame.position.y,
      this.animation.width,
      this.animation.height
    );
  }

  set position(position: Vector) {
    this.#position = position;

    const draggingDiff = Vector.sub(position, this.draggingPosition);
    const timeSinceDraggingUpdate =
      this.lifetime - this.draggingPositionTimestamp;

    this.direction = angleToDirection(
      Math.atan2(draggingDiff.y, draggingDiff.x)
    );

    const velocity = Vector.magnitude(draggingDiff) / timeSinceDraggingUpdate;

    if (Vector.magnitude(draggingDiff) > 5 || timeSinceDraggingUpdate > 0.5) {
      if (velocity < 5) {
        this.setAnimation(idleAnimation);
      } else if (velocity < 100) {
        this.setAnimation(walkingAnimation);
      } else {
        this.setAnimation(runningAnimation);
      }

      this.draggingPosition = position;
      this.draggingPositionTimestamp = this.lifetime;
    }

    this.updateFrame(velocity);
  }

  setAnimation(animation: Animation) {
    if (this.animation === animation) return;

    this.animation = animation;
    this.currentFrameTimestamp = this.lifetime;
  }

  get position() {
    return this.#position;
  }

  drawFrameNumber(ctx: CanvasRenderingContext2D) {
    const frame = this.getFrame();

    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(
      frame.toString(),
      this.#position.x,
      this.#position.y + this.animation.height + 30
    );
  }

  getFrame() {
    return this.currentFrame % this.animation.frames;
  }

  private updateFrame(velocity: number) {
    const animationVelocity = getAnimationVelocity(this.animation);

    const animationSpeed =
      animationVelocity === 0 ? 1 : velocity / animationVelocity;

    const frameDuration = this.animation.frameDuration / animationSpeed;

    if (this.lifetime - this.currentFrameTimestamp > frameDuration) {
      this.currentFrameTimestamp = this.lifetime;
      this.currentFrame++;
    }
  }
}

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

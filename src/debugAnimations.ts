import { Actor } from "./Actor";
import { idleAnimation, runningAnimation, walkingAnimation } from "./Animation";
import { loadSpriteSheet } from "./spriteSheet";

export async function debugAnimations() {
  loadSpriteSheet();

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = 900;
  canvas.height = 900;

  document.body.appendChild(canvas);

  const actors: Actor[] = [];

  const animations = [runningAnimation, walkingAnimation, idleAnimation];

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 6; y++) {
      const actor = new Actor();
      actor.position = { x: x * 100, y: y * 100 };
      actor.animation = animations[x];
      actor.direction = y;
      actors.push(actor);
    }
  }

  function animate(time: number) {
    actors.forEach((actor) => actor.update(time));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    actors.forEach((actor) => {
      actor.draw(time, ctx);
      actor.drawFrameNumber(time, ctx);
    });

    requestAnimationFrame(animate);
  }

  animate(1 / 60);
}

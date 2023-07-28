import "./style.css";
import { Actor } from "./Actor";
import { idleAnimation } from "./Animation";

const animatedCanvas = document.createElement("canvas");
const animatedCtx = animatedCanvas.getContext("2d")!;

animatedCanvas.width = 800;
animatedCanvas.height = 600;

document.body.appendChild(animatedCanvas);

const actors = [new Actor(), new Actor()];

actors[1].x = 100;
actors[1].animation = idleAnimation;

const animate = (time: number) => {
  actors.forEach((actor) => actor.update(time));

  animatedCtx.clearRect(0, 0, animatedCanvas.width, animatedCanvas.height);

  actors.forEach((actor) => actor.draw(time, animatedCtx));

  requestAnimationFrame(animate);
};

animate(1 / 60);

import { Bodies, Body, Composite, Engine, Render, Vector } from "matter-js";
import { Actor } from "./Actor";
import { loadSpriteSheet } from "./spriteSheet";
import { idleAnimation, runningAnimation, walkingAnimation } from "./Animation";

export function runInCircles() {
  const WIDTH = 900;
  const HEIGHT = 900;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  document.body.appendChild(canvas);

  const bodies: Matter.Body[] = [];
  const actors: Actor[] = [];

  const engine = Engine.create({ gravity: { x: 0, y: 0 } });

  loadSpriteSheet();

  const N = 200;

  for (let i = 0; i < N; i++) {
    const target = getPointOnCircle((i / N) * Math.PI * 2, 400, {
      x: WIDTH / 2,
      y: HEIGHT / 2,
    });

    const body = Bodies.circle(target.x, target.y, 10);

    bodies.push(body);

    Composite.add(engine.world, body);

    actors.push(new Actor());
  }

  let lastTime = performance.now();

  function animate(time: number) {
    const dt = (time - lastTime) /1000;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    bodies.forEach((body, index) => {
      const target = getPointOnCircle(
        (index / bodies.length) * Math.PI * 2 +
          (time / 10000) *
            (index % 2 ? 3 : 1) *
            (index % 3 === 0 ? 1 : -1) *
            (index % 10 === 0 ? 0 : 1),
        index % 2 ? 200 : 400,
        { x: WIDTH / 2, y: HEIGHT / 2 }
      );

      const diff = Vector.sub(target, body.position);

      if (Vector.magnitude(diff) > 30) {
        const force = Vector.mult(Vector.normalise(diff), 50);

        body.frictionAir = 0.01;
        Body.applyForce(body, body.position, force);
      } else {
        body.frictionAir = 10;
      }

      const actor = actors[index];

      actor.update(dt);

      actor.position = { x: body.position.x, y: body.position.y / 2 };

      lastTime = time;
    });

    [...actors]
      .sort((a, b) => a.position.y - b.position.y)
      .forEach((actor) => {
        actor.draw(ctx);
      });

    Engine.update(engine, dt);

    requestAnimationFrame(animate);
  }

  const render = Render.create({
    element: document.body.appendChild(document.createElement("div")),
    engine,
    options: {
      width: WIDTH,
      height: HEIGHT,
      wireframes: false,
    },
  });

  Render.run(render);

  animate(performance.now());
}

function getPointOnCircle(angle: number, radius: number, center: Vector) {
  return {
    x: center.x + Math.cos(angle) * radius,
    y: center.y + Math.sin(angle) * radius,
  };
}

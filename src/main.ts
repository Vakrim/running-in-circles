import "./style.css";
import sprite from "./sprite.gif";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d")!;

canvas.width = 630;
canvas.height = 438;

document.body.appendChild(canvas);

const image = new Image();
image.src = sprite;
image.onload = () => {
  ctx.drawImage(image, -1831, -435);

  // 1px black line
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 438);
  ctx.stroke();
};

const animatedCanvas = document.createElement("canvas");
const animatedCtx = animatedCanvas.getContext("2d")!;

animatedCanvas.width = 63;
animatedCanvas.height = 438;

document.body.appendChild(animatedCanvas);

const FRAMES = 10;

let frame = 0;

const animate = () => {
  animatedCtx.clearRect(0, 0, animatedCanvas.width, animatedCanvas.height);
  animatedCtx.drawImage(canvas, -63 * frame, 0);
  frame = (frame + 1) % FRAMES;

  setTimeout(animate, 90);
};

animate();

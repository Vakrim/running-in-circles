import sprite from "./sprite.gif";

export const spriteSheet = document.createElement("canvas");
const spriteSheetCtx = spriteSheet.getContext("2d")!;

const image = new Image();
image.src = sprite;

image.onload = () => {
  spriteSheet.width = image.width;
  spriteSheet.height = image.height;

  spriteSheetCtx.drawImage(image, 0, 0);

  removeBackground(spriteSheetCtx);
};

function removeBackground(ctx: CanvasRenderingContext2D) {
  const imageData = ctx.getImageData(
    0,
    0,
    spriteSheet.width,
    spriteSheet.height
  );
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (
      (r === 11 && g === 0 && b === 11) ||
      (r === 255 && g === 0 && b === 255)
    ) {
      data[i + 3] = 0;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

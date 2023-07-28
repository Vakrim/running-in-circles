export interface Animation {
  x: number;
  y: number;
  width: number;
  height: number;
  frames: number;
  frameDuration: number;
}

export const runningAnimation: Animation = {
  x: 1832,
  y: 435,
  width: 63,
  height: 73,
  frames: 10,
  frameDuration: 90,
};

export const idleAnimation: Animation = {
  x: 0,
  y: 0,
  width: 432/12,
  height: 420/6,
  frames: 12,
  frameDuration: 300,
};

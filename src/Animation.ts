export interface Animation {
  x: number;
  y: number;
  width: number;
  height: number;
  frames: number;
  frameDuration: number;
  distanceOverFrame: number;
}

export const runningAnimation: Animation = {
  x: 1832,
  y: 437,
  width: 63,
  height: 73,
  frames: 10,
  frameDuration: 0.09,
  distanceOverFrame: 13,
};

export const walkingAnimation: Animation = {
  x: 431,
  y: 1,
  width: 44,
  height: 68,
  frames: 8,
  frameDuration: 0.09,
  distanceOverFrame: 7,
};

export const idleAnimation: Animation = {
  x: 0,
  y: 0,
  width: 432 / 12,
  height: 420 / 6,
  frames: 12,
  frameDuration: 0.09,
  distanceOverFrame: 0,
};

export function getAnimationVelocity(animation: Animation) {
  return animation.distanceOverFrame / animation.frameDuration;
}

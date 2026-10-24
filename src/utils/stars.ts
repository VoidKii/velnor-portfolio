export interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  color: string;
}

export interface StarFieldOptions {
  minSize: number;
  maxSize: number;
  minOpacity: number;
  maxOpacity: number;
  maxDelay: number;
  minDuration: number;
  maxDuration: number;
  accentChance: number;
}

const DEFAULTS: StarFieldOptions = {
  minSize: 0.5,
  maxSize: 2.5,
  minOpacity: 0.2,
  maxOpacity: 0.7,
  maxDelay: 5,
  minDuration: 2,
  maxDuration: 5,
  accentChance: 0.3,
};

/** Generates the same star field on the server and in the browser for a given seed. */
export function generateStars(
  count: number,
  seed: number,
  options: Partial<StarFieldOptions> = {},
): Star[] {
  const config = { ...DEFAULTS, ...options };
  let state = seed >>> 0;

  const random = () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 0x100000000;
  };

  return Array.from({ length: count }, () => {
    const accent = random() < config.accentChance;
    return {
      x: random() * 100,
      y: random() * 100,
      size: config.minSize + random() * (config.maxSize - config.minSize),
      opacity: config.minOpacity + random() * (config.maxOpacity - config.minOpacity),
      delay: random() * config.maxDelay,
      duration: config.minDuration + random() * (config.maxDuration - config.minDuration),
      color: accent ? '#B8FF6A' : '#65E7FF',
    };
  });
}

const REVEAL_DELAYS = [
  "",
  "reveal-item-delay-1",
  "reveal-item-delay-2",
  "reveal-item-delay-3",
  "reveal-item-delay-4",
  "reveal-item-delay-5",
  "reveal-item-delay-6",
] as const;

function revealDelay(index: number) {
  return REVEAL_DELAYS[Math.min(index, REVEAL_DELAYS.length - 1)];
}

export { revealDelay };

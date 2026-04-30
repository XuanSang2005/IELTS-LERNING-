/**
 * Fisher-Yates shuffle. Returns a new array; does not mutate input.
 * Uses Math.random — adequate for exercise distractor selection where no
 * cryptographic guarantee is needed.
 */
export function shuffle<T>(items: readonly T[]): T[] {
  const out = items.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

/** Picks `n` distinct items from the pool (excluding `exclude` ids). */
export function pickN<T extends { id: string }>(
  pool: readonly T[],
  n: number,
  excludeIds: ReadonlySet<string>,
): T[] {
  const filtered = pool.filter((it) => !excludeIds.has(it.id))
  return shuffle(filtered).slice(0, n)
}

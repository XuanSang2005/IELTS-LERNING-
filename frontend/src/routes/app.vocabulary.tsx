import { createFileRoute, redirect } from '@tanstack/react-router'

/**
 * Backward-compat redirect. `/app/vocabulary` was the old single-page Lexicon
 * route. Plan Decision #10 makes `/app/lexicon` the canonical home and keeps
 * this URL working for any links cached in Daily emails or external bookmarks.
 */
export const Route = createFileRoute('/app/vocabulary')({
  beforeLoad: () => {
    throw redirect({
      to: '/app/lexicon',
      search: { discipline: 'vocabulary' },
      replace: true,
    })
  },
})

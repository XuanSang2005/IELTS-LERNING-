import { buildInitialCard, processReview } from './leitner'
import { addDaysUtc } from './tz-helper'

const NOW = new Date('2026-04-29T10:00:00Z')

function freshCard() {
  return buildInitialCard({ itemId: 'word-1', discipline: 'vocabulary', now: NOW })
}

describe('Leitner engine — buildInitialCard', () => {
  it('creates a box-1 introduced card due in 1 day', () => {
    const card = freshCard()
    expect(card.box).toBe(1)
    expect(card.status).toBe('introduced')
    expect(card.totalReviews).toBe(0)
    expect(card.totalCorrect).toBe(0)
    expect(card.lastReviewedAt).toBeNull()
    expect(card.nextDueAt).toBe(addDaysUtc(NOW, 1).toISOString())
    expect(card.introducedAt).toBe(NOW.toISOString())
  })
})

describe('Leitner engine — processReview', () => {
  it('5 consecutive good ratings → box 5 with 30d interval', () => {
    let card = freshCard()
    for (let i = 0; i < 5; i++) {
      card = processReview(card, 'good', NOW)
    }
    expect(card.box).toBe(5)
    expect(card.status).toBe('mature')
    expect(card.totalReviews).toBe(5)
    expect(card.totalCorrect).toBe(5)
    expect(card.nextDueAt).toBe(addDaysUtc(NOW, 30).toISOString())
  })

  it('easy from box 1 → box 3 with 7d interval', () => {
    const result = processReview(freshCard(), 'easy', NOW)
    expect(result.box).toBe(3)
    expect(result.status).toBe('learning')
    expect(result.nextDueAt).toBe(addDaysUtc(NOW, 7).toISOString())
  })

  it('easy from box 4 caps at box 5', () => {
    let card = freshCard()
    for (let i = 0; i < 4; i++) card = processReview(card, 'good', NOW) // box 5 actually
    // After 4 'good' from box 1: 1 → 2 → 3 → 4 → 5. Already at 5.
    expect(card.box).toBe(5)
    card = processReview(card, 'easy', NOW)
    expect(card.box).toBe(5)
    expect(card.status).toBe('mature')
  })

  it('again from box 5 → box 1, status learning, 1d interval', () => {
    let card = freshCard()
    for (let i = 0; i < 4; i++) card = processReview(card, 'good', NOW)
    expect(card.box).toBe(5)

    const after = processReview(card, 'again', NOW)
    expect(after.box).toBe(1)
    expect(after.status).toBe('learning')
    expect(after.totalReviews).toBe(5)
    expect(after.totalCorrect).toBe(4) // 4 'good', 1 'again'
    expect(after.nextDueAt).toBe(addDaysUtc(NOW, 1).toISOString())
  })

  it('any first review moves card off introduced (purity invariant)', () => {
    const fresh = freshCard()
    expect(fresh.status).toBe('introduced')

    const afterAgain = processReview(fresh, 'again', NOW)
    expect(afterAgain.status).toBe('learning')
    expect(afterAgain.totalReviews).toBe(1)
  })

  it('again does not increment totalCorrect', () => {
    const card = processReview(freshCard(), 'again', NOW)
    expect(card.totalCorrect).toBe(0)
    expect(card.totalReviews).toBe(1)
  })

  it('good from box 3 → box 4, transitions learning → mature', () => {
    let card = freshCard()
    card = processReview(card, 'good', NOW) // box 2, learning
    card = processReview(card, 'good', NOW) // box 3, learning
    expect(card.status).toBe('learning')
    card = processReview(card, 'good', NOW) // box 4, mature
    expect(card.status).toBe('mature')
    expect(card.box).toBe(4)
  })
})

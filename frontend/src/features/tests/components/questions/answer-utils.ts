import type { AnswerValue } from '@shared/schemas/test'

export function asString(value: AnswerValue | undefined): string {
  if (typeof value === 'string') return value
  return ''
}

export function asArray(value: AnswerValue | undefined): string[] {
  if (Array.isArray(value)) return value
  return []
}

export function asRecord(value: AnswerValue | undefined): Record<string, string> {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value
  return {}
}

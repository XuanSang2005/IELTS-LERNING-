/**
 * Per-task essay draft autosave. A reload (or crash) should not lose
 * work-in-progress writing. The server only sees the final submission;
 * drafts never leave the client.
 */

function draftKey(testId: string, task: 1 | 2): string {
  return `meridian-writing-draft-${testId}-task${task}-v1`
}

export function saveEssayDraft(testId: string, task: 1 | 2, text: string): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(draftKey(testId, task), text)
  } catch {
    // Quota errors are non-fatal.
  }
}

export function loadEssayDraft(testId: string, task: 1 | 2): string {
  if (typeof localStorage === 'undefined') return ''
  return localStorage.getItem(draftKey(testId, task)) ?? ''
}

export function clearEssayDrafts(testId: string): void {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(draftKey(testId, 1))
  localStorage.removeItem(draftKey(testId, 2))
}

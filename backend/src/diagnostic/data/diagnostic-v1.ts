// Re-export the shared diagnostic seed so the backend has a single import
// surface. The actual content lives at shared/seeds/diagnostic/diagnostic-v1
// so the frontend can also import the question shapes for type-safe rendering.
export { diagnosticV1 } from '@shared/seeds/diagnostic/diagnostic-v1'

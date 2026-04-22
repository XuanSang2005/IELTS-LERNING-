/**
 * Audio generation — planned workflow for ElevenLabs TTS.
 *
 * STATUS: Phase 1 (MVP) ships with Web Speech API fallback only.
 * See features/tests/components/AudioPlayer.tsx for dual-mode playback.
 *
 * PHASE 2 (post-launch): build backend/scripts/generate-audio.ts that:
 *   1. Reads a seed JSON test file from features/tests/data/seed/
 *   2. For each listening section, calls ElevenLabs TTS API with
 *      model_id: 'eleven_multilingual_v2', stability: 0.5,
 *      similarity_boost: 0.75, per-section voice mapping:
 *        - Section 1 (booking/registration) → Alice (warm female UK)
 *        - Section 2 (tour/facility)        → Brian (confident male UK)
 *        - Section 3 (tutorial/dialogue)    → Alice + Brian stitched
 *        - Section 4 (academic lecture)     → Charlotte (academic AU)
 *   3. Uploads MP3 to Cloudflare R2 under tests/{testId}/{sectionId}.mp3
 *   4. Rewrites the seed JSON with the new audioUrl
 *
 * Multi-speaker dialogues: split transcript on "SPEAKER:" regex,
 * generate per-speaker MP3s, stitch with 0.5s silence via ffmpeg.
 *
 * Required env (backend .env):
 *   ELEVENLABS_API_KEY, ELEVENLABS_MODEL
 *   R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_ENDPOINT, R2_PUBLIC_URL
 *
 * Cost monitoring: log charactersUsed per generation; log aggregate monthly.
 * Free tier: 10k chars/month → ~3 listening tests. Starter ($5): 30k. Creator ($22): 100k.
 *
 * This file intentionally exports nothing — the stub exists so grep finds it.
 */
export {}

/**
 * Audio Player — dual-mode playback.
 *
 * MODE 1 (preferred): MP3 from audioUrl (recorded TTS via ElevenLabs or voice actor)
 * MODE 2 (fallback): Browser Web Speech API, synthesised from the transcript
 *
 * TTS fallback quality varies by OS:
 *   - macOS / iOS: very good (Siri voices)
 *   - Windows: acceptable (Microsoft voices)
 *   - Android / Linux: variable
 *
 * Users see which mode is active via the "◆ AUDIO · RECORDED" / "◆ AUDIO · SYNTHESIZED"
 * label above the player.
 */

import { useEffect, useRef, useState } from 'react'
import { formatClock } from '@/features/tests/utils/format-time'

type Mode = 'mp3' | 'tts' | 'unavailable'

interface AudioPlayerProps {
  audioUrl: string | null | undefined
  transcript: string
  onEnded?: () => void
  locked?: boolean
}

export function AudioPlayer({
  audioUrl,
  transcript,
  onEnded,
  locked = false,
}: AudioPlayerProps) {
  const [mode, setMode] = useState<Mode>(() =>
    audioUrl
      ? 'mp3'
      : typeof window !== 'undefined' && 'speechSynthesis' in window
        ? 'tts'
        : 'unavailable',
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Probe mode on mount / when audioUrl changes. setState only fires from
  // event handlers (canplay / error), never directly in the effect body.
  useEffect(() => {
    if (!audioUrl) {
      return () => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          speechSynthesis.cancel()
        }
      }
    }
    const probe = new Audio(audioUrl)
    const onCanPlay = () => setMode('mp3')
    const onError = () => {
      setMode(
        typeof window !== 'undefined' && 'speechSynthesis' in window ? 'tts' : 'unavailable',
      )
    }
    probe.addEventListener('canplay', onCanPlay)
    probe.addEventListener('error', onError)
    probe.load()
    return () => {
      probe.removeEventListener('canplay', onCanPlay)
      probe.removeEventListener('error', onError)
    }
  }, [audioUrl])

  function pickBestVoice(): SpeechSynthesisVoice | null {
    const voices = speechSynthesis.getVoices()
    const priorities: Array<(v: SpeechSynthesisVoice) => boolean> = [
      (v) => v.lang === 'en-GB' && /female/i.test(v.name),
      (v) => v.lang === 'en-GB',
      (v) => v.lang === 'en-AU',
      (v) => v.lang.startsWith('en-'),
      () => true,
    ]
    for (const predicate of priorities) {
      const match = voices.find(predicate)
      if (match) return match
    }
    return null
  }

  function play() {
    if (locked || hasPlayed) return

    if (mode === 'mp3' && audioRef.current) {
      void audioRef.current.play()
      setIsPlaying(true)
      return
    }

    if (mode === 'tts' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(transcript)
      utterance.rate = 0.95
      utterance.pitch = 1
      const voice = pickBestVoice()
      if (voice) utterance.voice = voice

      const wordCount = transcript.split(/\s+/).filter(Boolean).length
      const estSeconds = Math.max(12, (wordCount / 150) * 60)
      setDuration(estSeconds)

      const start = Date.now()
      const tick = window.setInterval(() => {
        const elapsed = (Date.now() - start) / 1000
        setProgress(Math.min(100, (elapsed / estSeconds) * 100))
      }, 200)

      utterance.onend = () => {
        window.clearInterval(tick)
        setIsPlaying(false)
        setHasPlayed(true)
        setProgress(100)
        onEnded?.()
      }

      speechSynthesis.speak(utterance)
      setIsPlaying(true)
    }
  }

  function pause() {
    if (mode === 'mp3' && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }
    if (mode === 'tts') {
      speechSynthesis.pause()
      setIsPlaying(false)
    }
  }

  if (mode === 'unavailable') {
    return (
      <div className="border border-line bg-bone p-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite">
          ◆ AUDIO UNAVAILABLE
        </p>
        <p className="mt-3 font-fraunces text-[19px] italic text-graphite">
          Your browser does not support audio playback. Please switch to Chrome, Safari, or Firefox.
        </p>
      </div>
    )
  }

  const modeLabel = mode === 'mp3' ? '◆ AUDIO · RECORDED' : '◆ AUDIO · SYNTHESIZED'
  const disabled = locked || (hasPlayed && !isPlaying)

  return (
    <div className="border border-line bg-bone p-6 md:p-8">
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-graphite">
          {modeLabel}
        </span>
        {hasPlayed && (
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-claret">
            PLAYED
          </span>
        )}
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={isPlaying ? pause : play}
          disabled={disabled}
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
            disabled
              ? 'cursor-not-allowed border-line text-line'
              : 'border-ink text-ink hover:bg-ink hover:text-ivory'
          }`}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <rect x="3" y="2" width="3" height="12" />
              <rect x="10" y="2" width="3" height="12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M3 2 L13 8 L3 14 Z" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <div className="relative h-[2px] bg-line">
            <div
              className="absolute inset-y-0 left-0 bg-claret transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
            <span>{formatClock(((progress / 100) * (duration ?? 0)) || 0)}</span>
            <span>{duration ? formatClock(duration) : '—'}</span>
          </div>
        </div>
      </div>

      <p className="mt-5 text-center font-fraunces text-[15px] italic leading-relaxed text-graphite">
        {mode === 'tts'
          ? 'Synthesised voice for this session. The audio plays once.'
          : 'The audio plays once. Listen carefully.'}
      </p>

      {mode === 'mp3' && audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="auto"
          onTimeUpdate={(e) => {
            const a = e.currentTarget
            if (!a.duration || Number.isNaN(a.duration)) return
            setProgress((a.currentTime / a.duration) * 100)
            setDuration(a.duration)
          }}
          onEnded={() => {
            setIsPlaying(false)
            setHasPlayed(true)
            onEnded?.()
          }}
        />
      )}
    </div>
  )
}

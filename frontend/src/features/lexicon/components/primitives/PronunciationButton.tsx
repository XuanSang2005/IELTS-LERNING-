import { useCallback, useState } from 'react'

interface PronunciationButtonProps {
  ipa?: string
  audioUrl?: string
  word: string
  /** Smaller padding + smaller IPA text, for inline placements. */
  compact?: boolean
}

/**
 * IPA + speaker icon. Plays an attached audio clip when present, otherwise
 * falls back to the browser's Web Speech synthesis API. Disabled gracefully
 * when neither is available.
 */
export function PronunciationButton({
  ipa,
  audioUrl,
  word,
  compact = false,
}: PronunciationButtonProps) {
  const [playing, setPlaying] = useState(false)

  const speak = useCallback(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      setPlaying(true)
      audio.onended = () => setPlaying(false)
      audio.play().catch(() => setPlaying(false))
      return
    }
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const utter = new SpeechSynthesisUtterance(word)
    utter.lang = 'en-GB'
    utter.rate = 0.9
    setPlaying(true)
    utter.onend = () => setPlaying(false)
    utter.onerror = () => setPlaying(false)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }, [audioUrl, word])

  const ipaText = ipa ?? null

  return (
    <span className={`inline-flex items-center gap-2 ${compact ? '' : 'mt-1'}`}>
      {ipaText && (
        <span
          className={`font-mono text-graphite ${compact ? 'text-[12px]' : 'text-[14px] md:text-[15px]'}`}
        >
          {ipaText}
        </span>
      )}
      <button
        type="button"
        onClick={speak}
        aria-label={`Pronounce ${word}`}
        className={`group inline-flex items-center justify-center border border-line text-graphite transition-colors hover:border-claret hover:text-claret ${
          compact ? 'h-6 w-6' : 'h-8 w-8'
        } ${playing ? 'border-claret text-claret' : ''}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className={compact ? 'h-3 w-3' : 'h-3.5 w-3.5'}
          fill="currentColor"
        >
          <path d="M8 1.5 4.5 4.5H2v7h2.5L8 14.5z" />
          <path
            d="M11 5.5c1 .8 1.5 1.5 1.5 2.5s-.5 1.7-1.5 2.5"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M13 3.5c2 1.4 3 2.7 3 4.5s-1 3.1-3 4.5"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </button>
    </span>
  )
}

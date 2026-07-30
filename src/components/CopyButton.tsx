import { useState } from 'react'

interface Props {
  text: string
  label?: string
}

export default function CopyButton({ text, label = '주소 복사' }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard 미지원 시 무시 */
    }
  }

  return (
    <span className="copywrap">
      <button
        type="button"
        className="copybtn"
        onClick={copy}
        aria-label={label}
      >
        {copied ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 13l4 4L19 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect
              x="9"
              y="9"
              width="11"
              height="11"
              rx="2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M15 5.5V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
      {copied && <span className="copybtn__toast">복사됐습니다</span>}
    </span>
  )
}

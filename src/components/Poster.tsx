import { useEffect, useState } from 'react'
import { event } from '../data/event'

// 공연 포스터 (webp 우선 · jpg 폴백)
const POSTER_WEBP = '/poster.webp'
const POSTER_JPG = '/poster.jpg'

export default function Poster() {
  const [open, setOpen] = useState(false)

  // 크게 보는 동안 배경 스크롤 잠금 + ESC로 닫기
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <figure className="poster">
      <button
        type="button"
        className="poster__btn"
        onClick={() => setOpen(true)}
        aria-label={`${event.title} 포스터 크게 보기`}
      >
        <picture>
          <source srcSet={POSTER_WEBP} type="image/webp" />
          <img
            className="poster__img"
            src={POSTER_JPG}
            alt={event.posterAlt}
            width={1037}
            height={1469}
            decoding="async"
          />
        </picture>
      </button>

      {open && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${event.title} 포스터`}
          onClick={() => setOpen(false)}
        >
          <picture>
            <source srcSet={POSTER_WEBP} type="image/webp" />
            <img className="lightbox__img" src={POSTER_JPG} alt={event.posterAlt} />
          </picture>
          <button type="button" className="lightbox__close" onClick={() => setOpen(false)}>
            ✕ 닫기
          </button>
        </div>
      )}
    </figure>
  )
}

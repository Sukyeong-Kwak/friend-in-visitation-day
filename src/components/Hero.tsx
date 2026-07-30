import { event } from '../data/event'

export default function Hero() {
  return (
    <header className="hero">
      <span className="hero__curve" aria-hidden="true" />
      <span className="hero__bloom hero__bloom--1" aria-hidden="true" />
      <span className="hero__bloom hero__bloom--2" aria-hidden="true" />

      <p className="hero__host">
        {event.host} <b className="hero__host-em">{event.eventName}</b>
      </p>

      <span className="hero__chip">{event.eyebrow}</span>
      <h1 className="hero__title">{event.title}</h1>

      <p className="hero__tagline">
        <span className="hero__tagline-quote">{event.taglineQuote}</span>
        <span className="hero__tagline-lead">{event.taglineLead}</span>
        <b className="hero__tagline-ask">{event.taglineAsk}</b>
      </p>

      <div className="hero__when">
        <span className="hero__when-date">{event.heroDate}</span>
        <span className="hero__when-time">{event.heroTime}</span>
        <span className="hero__when-place">
          {event.venueName} {event.venueHall}
        </span>
      </div>

      <div className="hero__cta">
        <a className="hero__btn" href="#map">
          오시는 길
        </a>
        <a className="hero__btn hero__btn--fill" href="#schedule">
          타임 테이블
        </a>
      </div>
    </header>
  )
}

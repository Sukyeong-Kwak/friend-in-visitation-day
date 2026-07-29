import { event, heroFacts } from '../data/event'

export default function Hero() {
  return (
    <header className="hero">
      <span className="hero__bloom hero__bloom--1" aria-hidden="true" />
      <span className="hero__bloom hero__bloom--2" aria-hidden="true" />

      <p className="hero__host">{event.host}</p>
      <span className="hero__chip">{event.eventName}</span>

      <p className="hero__eyebrow">{event.eyebrow}</p>
      <h1 className="hero__title">{event.title}</h1>
      <p className="hero__tagline">“{event.tagline}”</p>

      <div className="hero__facts">
        {heroFacts.map((f) => (
          <span className="fact" key={f.id}>
            <b className="fact__key">{f.key}</b>
            <small className="fact__sub">{f.sub}</small>
          </span>
        ))}
      </div>

      <div className="hero__cta">
        <a className="hero__btn hero__btn--fill" href="#program">
          공연 미리보기
        </a>
        <a className="hero__btn" href="#map">
          오시는 길
        </a>
      </div>
    </header>
  )
}

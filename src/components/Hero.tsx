import { event } from '../data/event'
import Poster from './Poster'

export default function Hero() {
  return (
    <header className="hero">
      <p className="hero__host">
        {event.host} <b className="hero__host-em">{event.eventName}</b>
      </p>

      <Poster />

      <div className="hero__info">
        <p className="hero__caption">포스터를 누르면 크게 볼 수 있어요</p>

        <dl className="facts">
          <div className="facts__row">
            <dt className="facts__label">일시</dt>
            <dd className="facts__value">
              {event.dateLong}
              <span className="facts__sub">{event.timeLong}</span>
            </dd>
          </div>
          <div className="facts__row">
            <dt className="facts__label">장소</dt>
            <dd className="facts__value">
              {event.venueName} {event.venueHall}
              <span className="facts__sub">{event.venueAddress}</span>
            </dd>
          </div>
        </dl>

        <nav className="hero__links">
          <a className="hero__link" href="#schedule">
            당일 순서
          </a>
          <a className="hero__link" href="#map">
            오시는 길
          </a>
        </nav>
      </div>
    </header>
  )
}

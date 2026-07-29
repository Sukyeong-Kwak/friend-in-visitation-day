import { event } from '../data/event'
import Countdown from './Countdown'
import CopyButton from './CopyButton'

export default function EventDetails() {
  return (
    <section className="details">
      <p className="details__intro">{event.greeting}</p>

      <div className="infocard">
        <div className="detail">
          <span className="detail__label">일시</span>
          <span className="detail__body">
            <span className="detail__value">
              {event.date}
              <span className="detail__tag">{event.dateNote}</span>
            </span>
            <span className="detail__sub">
              {event.time}
              <Countdown />
            </span>
          </span>
        </div>

        <div className="detail detail--last">
          <span className="detail__label">장소</span>
          <span className="detail__body">
            <span className="detail__value">
              {event.venueName} {event.venueHall}
            </span>
            <span className="detail__sub detail__sub--addr">
              {event.venueAddress}
              <CopyButton text={event.venueAddress} />
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}

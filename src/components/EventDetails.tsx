import { event, fran } from '../data/event'

export default function EventDetails() {
  return (
    <section className="details">
      <div className="fran">
        <p className="fran__name">
          {event.eventName}
          <span className="fran__name-ko">{event.eventNameKo}</span>
        </p>

        <ul className="fran__list">
          {fran.map((item) => (
            <li className="fran__item" key={item.letter}>
              <span className="fran__letter" aria-hidden="true">
                {item.letter}
              </span>
              <span className="fran__en">{item.en}</span>
              <span className="fran__ko">{item.ko}</span>
            </li>
          ))}
        </ul>

        <p className="fran__note">{event.franNote}</p>
      </div>

      <p className="details__intro">{event.greeting}</p>
    </section>
  )
}

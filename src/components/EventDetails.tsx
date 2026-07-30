import { event } from '../data/event'

export default function EventDetails() {
  return (
    <section className="details">
      <p className="details__intro">{event.greeting}</p>
    </section>
  )
}

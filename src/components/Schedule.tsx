import { event, schedule } from '../data/event'

export default function Schedule() {
  return (
    <section className="schedule" id="schedule">
      <div className="section-head">
        <h2 className="section-head__title">당일 순서</h2>
        <p className="section-head__sub">식사부터 공연까지, 함께해 주세요</p>
      </div>

      <ol className="schedule__list">
        {schedule.map((item) => (
          <li className={`sch${item.end ? ' sch--end' : ''}`} key={item.id}>
            <span className="sch__time">{item.time}</span>
            <span className="sch__line" aria-hidden="true" />
            <div className="sch__body">
              <h3 className="sch__title">
                {item.title}
                {item.badge && <span className="sch__badge">{item.badge}</span>}
                {item.dur && <span className="sch__dur">{item.dur}</span>}
              </h3>
              {item.desc && <p className="sch__desc">{item.desc}</p>}
            </div>
          </li>
        ))}
      </ol>

      <p className="schedule__caption">{event.scheduleNote}</p>
      <div className="schedule__note schedule__note--meal">
        <p className="schedule__note-line">{event.mealNotice}</p>
        <p className="schedule__note-line">{event.mealCostNotice}</p>
      </div>
    </section>
  )
}

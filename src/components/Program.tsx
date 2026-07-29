import { teaserQuote, teasers, teaserOutro } from '../data/event'

export default function Program() {
  return (
    <section className="program" id="program">
      <div className="section-head">
        <span className="section-head__kicker">PREVIEW</span>
        <h2 className="section-head__title">공연 미리보기</h2>
        <p className="section-head__sub">아주 조금만 보여드릴게요</p>
      </div>

      <blockquote className="quote">
        <span className="quote__mark" aria-hidden="true">
          “
        </span>
        {teaserQuote.split('\n').map((line) => (
          <span className="quote__line" key={line}>
            {line}
          </span>
        ))}
        <cite className="quote__cite">오프닝 넘버 중에서</cite>
      </blockquote>

      <div className="program__list">
        {teasers.map((t) => (
          <article
            className="tease"
            key={t.id}
            style={{ ['--tease-color' as string]: t.color }}
          >
            <span className="tease__no">{t.no}</span>
            <div className="tease__body">
              <h3 className="tease__title">{t.title}</h3>
              <p className="tease__line">{t.line}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="program__outro">{teaserOutro}</p>
    </section>
  )
}

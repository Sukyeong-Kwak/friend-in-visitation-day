import { event } from '../data/event'

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__rule" aria-hidden="true" />
      <p className="footer__msg">
        오늘을 살아가는 우리의 이야기,
        <br />
        그 자리에 당신을 초대합니다.
      </p>
      <p className="footer__sign">{event.host}</p>
    </footer>
  )
}

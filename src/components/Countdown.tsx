import { event } from '../data/event'

// 한국 시간(Asia/Seoul) 기준 오늘 날짜
function kstToday() {
  const s = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
  const [y, m, d] = s.split('-').map(Number)
  return { y, m, d }
}

const WEEKDAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
const DAY = 86400000

export default function Countdown() {
  const { year, month, day } = event.eventDate
  const t = kstToday()
  const todayUTC = Date.UTC(t.y, t.m - 1, t.d)
  const eventUTC = Date.UTC(year, month - 1, day)
  const diff = Math.round((eventUTC - todayUTC) / DAY)

  if (diff < 0) return null

  let text: string
  let today = false

  if (diff === 0) {
    text = '오늘입니다!'
    today = true
  } else if (diff === 1) {
    text = '내일입니다!'
  } else {
    const evDow = new Date(eventUTC).getUTCDay()
    const todayDow = new Date(todayUTC).getUTCDay()
    const sinceMonday = (todayDow + 6) % 7 // 월요일 시작 주
    const thisMonday = todayUTC - sinceMonday * DAY
    const nextMonday = thisMonday + 7 * DAY
    const weekAfter = thisMonday + 14 * DAY
    if (eventUTC < nextMonday) text = `이번 주 ${WEEKDAYS[evDow]}`
    else if (eventUTC < weekAfter) text = `다음 주 ${WEEKDAYS[evDow]}`
    else text = `D-${diff}`
  }

  return (
    <span className={`dday${today || diff === 1 ? ' dday--soon' : ''}`}>
      {text}
    </span>
  )
}

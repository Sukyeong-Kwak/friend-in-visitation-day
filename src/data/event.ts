// 친구초청잔치 · 뮤지컬 「청년시선」 초대장
// 행사 정보는 이 파일만 수정하면 전체 페이지에 반영됩니다.

export interface ScheduleItem {
  id: string
  time: string
  title: string
  desc: string
  dur?: string
  badge?: string
}

export const event = {
  host: '포도나무교회 청년부',
  eventName: '친구초청잔치',
  title: '청년시선',
  eyebrow: '2026 청년부 뮤지컬',
  // 히어로 문구 — 1행은 인용, 마지막 행은 강조
  taglineQuote: '“수고하고 무거운 짐 진 자들아, 다 내게로 오라.”',
  taglineLead: '모든 것이 어두워진 순간,',
  taglineAsk: '당신의 시선은 어디로 향하나요?',
  // 히어로 날짜 블록
  heroDate: '2026.8.17',
  heroTime: 'MON 7PM',
  // 인사말
  greeting:
    '취업, 관계, 통장 잔고… 저마다의 무게를 안고 살아가는 우리의 이야기를 무대에 담았습니다. 웃다가 울다가, 한 청년의 하루를 함께 따라가다 보면 어느새 나의 이야기가 되어 있을 거예요. 공연 전에는 따뜻한 저녁 식사도 준비되어 있으니, 편한 마음으로 오셔서 함께해 주세요.',
  // 장소
  venueName: '포도나무교회',
  venueHall: '본당',
  venueAddress: '경기 용인시 기흥구 신정로 123-1',
  venueNote: '공연은 교회 본당에서 진행됩니다.',
  // 뷔페 안내
  mealNotice: '뷔페 식사는 사전 신청하신 분들을 위해 준비됩니다. 초대해 주신 분께 미리 신청해 주세요.',
  scheduleNote: '본행사는 저녁 8시 30분에 마칠 예정이며, 순서별 시간은 조금 달라질 수 있어요.',
} as const

// 네이버 지도 장소 링크 (모바일=앱, PC=웹으로 정확히 열림)
export const naverPlaceUrl = 'https://naver.me/FCZ7JYIg'

// 카카오맵 장소 링크 — applink.map.kakao.com 으로 리다이렉트되어 앱이 자동으로 열립니다.
export const kakaoPlaceUrl = 'https://kko.to/uH34YhE4Z4'

// 네이버 장소 ID (naver.me 단축링크가 가리키는 장소) — 지도 임베드에 사용
export const naverPlaceId = '11852583'

// 페이지에 표시할 네이버 지도 (API 키 불필요 · 모바일 장소 지도 페이지)
export const naverEmbedUrl = `https://m.place.naver.com/place/${naverPlaceId}/location`

// 포도나무교회 본당 좌표 (네이버 장소 정보 기준 — 지도 마커·티맵 길찾기용)
export const venueCoord = { lat: 37.2825666, lng: 127.1009749 }

// 당일 순서
export const schedule: ScheduleItem[] = [
  {
    id: 'buffet',
    time: '오후 5:30',
    title: '뷔페 식사',
    desc: '본행사 전, 함께 저녁을 나눕니다.',
    badge: '신청자',
  },
  {
    id: 'praise',
    time: '저녁 7:00',
    title: '찬양 · 경배',
    desc: '다 함께 찬양하며 문을 엽니다.',
    dur: '약 20분',
  },
  {
    id: 'musical',
    time: '저녁 7:20',
    title: '뮤지컬 「청년시선」',
    desc: '청년부가 직접 준비한 창작 뮤지컬.',
    dur: '약 30분',
  },
  {
    id: 'message',
    time: '저녁 7:50',
    title: '말씀',
    desc: '오늘의 이야기를 마음에 담는 시간.',
    dur: '약 30분',
  },
]

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
  // 포스터 대체 텍스트 (이미지가 안 보이거나 화면 낭독기를 쓸 때 읽히는 문구)
  posterAlt:
    '뮤지컬 「청년시선」 포스터 — 횡단보도를 건너는 청년들 위로 “수고하고 무거운 짐 진 자들아, 다 내게로 오라” 문구가 적혀 있습니다. 2026.08.17(월) 저녁 7시, 포도나무교회 본당.',
  // 포스터 아래 정보란
  dateLong: '2026년 8월 17일 (월)',
  timeLong: '저녁 7시',
  // 인사말
  greeting:
    '취업, 관계, 통장 잔고… 저마다의 무게를 안고 살아가는 우리의 이야기를 무대에 담았습니다. 웃다가 울다가, 한 청년의 하루를 함께 따라가다 보면 어느새 나의 이야기가 됩니다. 공연 전에는 따뜻한 저녁 식사도 준비되어 있으니, 편한 마음으로 오셔서 함께해 주세요.',
  // 장소
  venueName: '포도나무교회',
  venueHall: '본당',
  venueAddress: '경기 용인시 기흥구 신정로 123-1',
  venueNote: '공연은 교회 본당에서 진행됩니다.',
  // 뷔페 안내
  mealNotice: '뷔페 식사는 사전 신청하신 분들을 위해 준비됩니다. 초대해 주신 분께 미리 신청해 주세요.',
  // 식사비 안내 (청년 무료 · 장년 유료, 비용은 초대하는 분 부담)
  // TODO: 장년 식사비 금액 확정되면 아래 문구에 반영
  mealCostNotice:
    '청년은 식사비 없이 함께하실 수 있고, 장년분들은 식사비가 있습니다(금액은 확정되는 대로 안내드립니다). 정성껏 차린 뷔페라 오시면 든든하게 드실 수 있어요. 비용은 초대해 주신 분께서 함께 준비해 주시면 감사하겠습니다.',
  scheduleNote: '본행사는 저녁 8시 30분에 마칠 예정이며, 순서별 시간은 조금 달라질 수 있습니다.',
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
    desc: '청년부가 직접 준비한 창작 뮤지컬입니다.',
    dur: '약 30분',
  },
  {
    id: 'message',
    time: '저녁 7:50',
    title: '말씀',
    desc: '오늘의 이야기를 마음에 담는 시간입니다.',
    dur: '약 30분',
  },
]

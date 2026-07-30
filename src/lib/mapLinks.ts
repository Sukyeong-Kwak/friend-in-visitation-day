// 지도 앱 연결 (네이버지도 · 카카오맵 · 티맵)
// 네이버: 확인된 장소 링크로 정확히 이동
// 카카오·티맵: 정확한 좌표로 길찾기(route) — 도착지가 채워진 상태로 열림
import { naverPlaceUrl, kakaoPlaceUrl, venueCoord, event } from '../data/event'

const goalName = encodeURIComponent(event.venueName)

const ua = typeof navigator !== 'undefined' ? navigator.userAgent : ''
const isIOS = /iphone|ipad|ipod/i.test(ua)
const isAndroid = /android/i.test(ua)
const isMobile = isIOS || isAndroid

// 티맵 스토어 (미설치 시 설치 유도)
const TMAP_STORE = isIOS
  ? 'https://apps.apple.com/kr/app/id431589174'
  : 'https://play.google.com/store/apps/details?id=com.skt.tmap.ku'

export type MapAppId = 'naver' | 'kakao' | 'tmap'

export interface MapApp {
  id: MapAppId
  label: string
  // 'link' = 유니버설 링크 그대로 열기 / 'scheme' = 앱 스킴 시도 후 폴백
  kind: 'link' | 'scheme'
  url: string
  fallback: string
}

export const mapApps: MapApp[] = [
  {
    id: 'naver',
    label: '네이버지도',
    kind: 'link',
    url: naverPlaceUrl,
    fallback: naverPlaceUrl,
  },
  {
    id: 'kakao',
    label: '카카오맵',
    kind: 'scheme',
    // 도착지가 채워진 길찾기 화면으로 바로 진입 (ep=위도,경도)
    url: `kakaomap://route?ep=${venueCoord.lat},${venueCoord.lng}&by=CAR`,
    // 앱 미설치·PC: 카카오맵 장소 링크(앱 자동 실행 딥링크)
    fallback: kakaoPlaceUrl,
  },
  {
    id: 'tmap',
    label: '티맵',
    kind: 'scheme',
    // 정확한 좌표로 길찾기 (goalx=경도, goaly=위도)
    url: `tmap://route?goalname=${goalName}&goalx=${venueCoord.lng}&goaly=${venueCoord.lat}`,
    fallback: TMAP_STORE,
  },
]

export function openMap(app: MapApp): void {
  // 유니버설 링크(네이버): 그대로 열면 모바일은 앱, PC는 웹
  if (app.kind === 'link') {
    window.open(app.url, '_blank', 'noopener,noreferrer')
    return
  }
  // 데스크톱: 앱 스킴이 동작하지 않으므로 바로 폴백
  if (!isMobile) {
    window.open(app.fallback, '_blank', 'noopener,noreferrer')
    return
  }
  // 모바일: 앱 스킴 시도 후, 전환이 없으면 폴백
  const start = Date.now()
  const timer = window.setTimeout(() => {
    if (Date.now() - start < 2000) window.location.href = app.fallback
  }, 1600)
  const onHide = () => {
    if (document.hidden) window.clearTimeout(timer)
  }
  document.addEventListener('visibilitychange', onHide, { once: true })
  window.location.href = app.url
}

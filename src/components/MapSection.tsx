import { useEffect, useRef, useState } from 'react'
import { event, naverEmbedUrl, venueCoord } from '../data/event'
import { mapApps, openMap } from '../lib/mapLinks'
import CopyButton from './CopyButton'

// 네이버 Dynamic Map 클라이언트 ID (.env → VITE_NAVER_MAP_CLIENT_ID)
const naverClientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID as string | undefined

declare global {
  interface Window {
    naver?: any
    // 네이버 지도 인증 실패 시 전역으로 호출됨
    navermap_authFailure?: () => void
  }
}

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapObj = useRef<any>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!naverClientId) return
    const scriptId = 'naver-maps-sdk'

    // 인증 실패(미등록 URL·잘못된 키 등) 시 네이버 장소 지도 임베드로 폴백
    window.navermap_authFailure = () => setFailed(true)

    const init = () => {
      const naver = window.naver
      if (!naver?.maps || !mapRef.current) return
      // 포도나무교회 정확한 좌표로 고정
      const center = new naver.maps.LatLng(venueCoord.lat, venueCoord.lng)
      const map = new naver.maps.Map(mapRef.current, { center, zoom: 17 })
      mapObj.current = map

      // 위치 강조용 원
      new naver.maps.Circle({
        map,
        center,
        radius: 32,
        strokeColor: '#e07b8e',
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: '#e07b8e',
        fillOpacity: 0.14,
      })

      // 상호 라벨이 달린 커스텀 마커
      new naver.maps.Marker({
        position: center,
        map,
        title: `${event.venueName} ${event.venueHall}`,
        zIndex: 100,
        icon: {
          content:
            '<div class="nmap-pin"><span class="nmap-pin__label">' +
            event.venueName +
            ' ' +
            event.venueHall +
            '</span><span class="nmap-pin__dot"></span></div>',
          anchor: new naver.maps.Point(65, 66),
        },
      })
      setReady(true)
    }

    if (window.naver?.maps) {
      init()
      return
    }
    if (!document.getElementById(scriptId)) {
      const s = document.createElement('script')
      s.id = scriptId
      s.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${naverClientId}`
      s.async = true
      s.onload = init
      s.onerror = () => setFailed(true)
      document.head.appendChild(s)
    }
  }, [])

  const useNaver = Boolean(naverClientId) && !failed

  // 전체보기 토글 시(펼칠 때·닫을 때 모두): 배경 스크롤 잠금 + 지도 리사이즈 후 포도나무교회 재중심
  useEffect(() => {
    document.body.style.overflow = expanded ? 'hidden' : ''
    if (window.naver && mapObj.current) {
      const naver = window.naver
      const map = mapObj.current
      setTimeout(() => {
        naver.maps.Event.trigger(map, 'resize')
        map.setCenter(new naver.maps.LatLng(venueCoord.lat, venueCoord.lng))
      }, 80)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [expanded])

  // ESC로 닫기
  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setExpanded(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expanded])

  return (
    <section className="map" id="map">
      <div className="section-head">
        <h2 className="section-head__title">오시는 길</h2>
        <p className="section-head__sub">
          {event.venueName} {event.venueHall}
        </p>
      </div>

      <div className={`map__frame${expanded ? ' map__frame--full' : ''}`}>
        {useNaver ? (
          <div ref={mapRef} className="map__canvas" aria-label="네이버 지도" />
        ) : (
          // 키 없이 쓰는 네이버 장소 지도 — 상단 헤더/탭은 잘라내고 지도만 보이게 함
          <iframe
            title="포도나무교회 본당 위치 지도 (네이버지도)"
            className="map__canvas map__canvas--naver"
            src={naverEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
        {useNaver && !ready && (
          <div className="map__loading">지도를 불러오는 중…</div>
        )}
        <button
          type="button"
          className="map__expand"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? '✕ 닫기' : '전체보기'}
        </button>
      </div>

      <p className="map__addr">
        <span>{event.venueAddress}</span>
        <CopyButton text={event.venueAddress} />
      </p>
      <p className="map__note">{event.venueNote}</p>

      <p className="map__cta">지도 앱으로 길찾기</p>
      <div className="map__apps">
        {mapApps.map((app) => (
          <button
            key={app.id}
            type="button"
            className={`appbtn appbtn--${app.id}`}
            onClick={() => openMap(app)}
          >
            {app.label}
          </button>
        ))}
      </div>
    </section>
  )
}

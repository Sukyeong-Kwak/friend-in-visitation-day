# 청년시선 · 친구초청잔치 초대장

포도나무교회 청년부 **친구초청잔치** 초대장 웹페이지입니다.
창작 뮤지컬 「청년시선」(2026) 공연 안내와 뷔페 식사 안내, 오시는 길(포도나무교회)을 담고 있습니다.

- **일시**: 2026년 8월 17일 (월) 저녁 7시 · 뷔페 식사 오후 5시 30분(신청자에 한함)
- **장소**: 포도나무교회 (경기 용인시 기흥구 신정로 123-1)
- **스택**: Vite + React + TypeScript
- **배포**: Vercel

## 개발

```bash
npm install
npm run dev      # 로컬 개발 서버
npm run build    # 타입체크 + 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 미리보기
```

## 내용 수정

행사 정보(날짜·시간·장소), 당일 순서, 공연 미리보기 문구는 모두 아래 한 파일에서 관리합니다.

```
src/data/event.ts
```

- `event` : 행사명·히어로 문구(`tagline*`)·히어로 날짜(`heroDate`/`heroTime`)·장소·인사말
- `schedule` : 당일 순서(뷔페 / 공연)

## 지도 (API 키 불필요)

- 표시용 지도는 **네이버 장소 지도 임베드**입니다(`m.place.naver.com/place/{id}/location`, 키 불필요).
  상단 헤더·탭 영역은 CSS(`.map__canvas--naver`)로 잘라내 지도만 보이게 처리했습니다.
- `.env` 에 `VITE_NAVER_MAP_CLIENT_ID`(네이버 클라우드 Maps 키)를 넣으면
  임베드 대신 **네이버 Dynamic Map**(직접 그린 마커)으로 자동 전환됩니다.
- 정확한 위치·길찾기는 앱 연결 버튼으로 처리합니다:
  - **네이버지도 · 카카오맵**: 확인된 장소 단축링크로 앱/웹에 정확히 연결
  - **티맵**: 좌표 기반 길찾기(미설치 시 스토어 폴백)
- 장소를 바꾸려면 `src/data/event.ts` 의 `naverPlaceUrl`, `kakaoPlaceUrl`,
  `naverPlaceId`, `venueCoord`, `venueAddress` 값을 수정하세요.
  (`naverPlaceId` 는 `naver.me` 단축링크를 열었을 때 주소창의 `/place/{숫자}` 값)

## 공유 이미지(OG)

`public/og-image.png` (1200×630). 카카오톡 공유 시 노출되며,
`index.html` 의 `og:url`/`og:image` 는 실제 배포 도메인에 맞춰 수정해야 합니다.

## Vercel 배포

1. 이 저장소를 GitHub에 push
2. Vercel → New Project → 저장소 선택
3. Framework Preset: **Vite** (자동 인식), 그대로 Deploy
4. (선택) Settings → Environment Variables 에 `VITE_NAVER_MAP_CLIENT_ID` 추가

# 청년시선 · 친구초청잔치 초대장

포도나무교회 청년부 **친구초청잔치** 초대장 웹페이지입니다.
창작 뮤지컬 「청년시선」(2026) 공연 안내와 뷔페 식사 안내, 오시는 길(포도나무교회)을 담고 있습니다.

- **일시**: 2026년 8월 17일 (월) 저녁 7시 · 뷔페 식사 오후 5시 30분(신청자에 한함)
- **장소**: 포도나무교회 (경기 용인시 기흥구 신정로 123-1)
- **스택**: Vite + React + TypeScript
- **배포**: Vercel (Vercel Analytics 적용)

## 개발

```bash
npm install
npm run dev      # 로컬 개발 서버
npm run build    # 타입체크 + 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 미리보기
```

환경 변수는 기본적으로 필요 없습니다. 선택 항목은 `.env.example` 을 참고하세요.

## 페이지 구성

한 장짜리 초대장이며, 위에서부터 아래 순서로 이어집니다.

| 섹션 | 컴포넌트 | 내용 |
| --- | --- | --- |
| 히어로 | `src/components/Hero.tsx` | 주최 머리글 · 공연 포스터 · 일시/장소 정보란 · 섹션 바로가기 |
| 포스터 | `src/components/Poster.tsx` | 포스터 이미지 + 눌러서 크게 보기(전체화면) |
| 인사말 | `src/components/EventDetails.tsx` | 초대 인사말(`greeting`) |
| 당일 순서 | `src/components/Schedule.tsx` | 뷔페 / 찬양 / 뮤지컬 / 말씀 + 종료 시각·뷔페 안내 |
| 오시는 길 | `src/components/MapSection.tsx` | 지도 · 주소 복사 · 지도 앱 연결 |
| 푸터 | `src/components/Footer.tsx` | 마무리 문구(컴포넌트에 직접 작성) |

```
src/
├─ App.tsx              # 섹션 조립
├─ components/          # 위 표의 섹션들 + CopyButton
├─ data/event.ts        # 모든 행사 정보 (여기만 고치면 됨)
├─ lib/mapLinks.ts      # 지도 앱 연결 로직
└─ index.css            # 전체 스타일
public/                 # favicon · poster.webp · poster.jpg · og-image.png
scripts/og-template.html # OG 이미지 원본
```

## 공연 포스터

포스터가 페이지의 중심입니다. 히어로에서 화면 폭을 꽉 채워 보여 주고,
누르면 전체화면으로 크게 볼 수 있습니다.

- 파일: `public/poster.webp` (주) · `public/poster.jpg` (폴백) — 두 파일 모두 같은 이미지입니다.
- 포스터를 바꾸면 아래 두 가지를 함께 맞춰 주세요.
  - `event.posterAlt` : 화면 낭독기·이미지 로딩 실패 시 읽히는 설명
  - `index.css` 의 `--poster-edge` : **포스터 맨 아랫줄의 평균 색**.
    이 색에서 시작하는 그러데이션으로 포스터가 아래 정보란에 이어지므로,
    값이 어긋나면 경계선이 보입니다.

원본 이미지에서 두 파일을 다시 만들 때:

```bash
python -c "from PIL import Image; im=Image.open('원본.jpg').convert('RGB'); \
im.save('public/poster.jpg', quality=84, optimize=True, progressive=True); \
im.save('public/poster.webp', quality=82, method=6)"
```

## 내용 수정

행사 정보(날짜·시간·장소)와 당일 순서는 아래 한 파일에서 관리합니다.

```
src/data/event.ts
```

- `event`
  - 주최·공연명: `host`, `eventName`, `title`
  - 포스터 설명: `posterAlt`
  - 히어로 정보란: `dateLong`(2026년 8월 17일 (월)), `timeLong`(저녁 7시)
  - 인사말: `greeting`
  - 장소: `venueName`, `venueHall`, `venueAddress`, `venueNote` (히어로·오시는 길에서 함께 사용)
  - 안내 문구: `scheduleNote`(종료 시각), `mealNotice`(뷔페 사전 신청)
- `schedule` : 당일 순서 배열 (뷔페 / 찬양 / 뮤지컬 / 말씀)
- 지도 관련 값: `naverPlaceUrl`, `kakaoPlaceUrl`, `naverPlaceId`, `venueCoord`

푸터 마무리 문구만 `src/components/Footer.tsx` 안에 직접 들어 있습니다.

### 문구 어투

- **안내문은 합니다체** — 사실 전달, 순서 설명 (예: "공연은 교회 본당에서 진행됩니다.")
- **요청·감성 문구는 해요체** — 부탁, 초대하는 말 (예: "미리 신청해 주세요.")

## 지도 (API 키 불필요)

- 표시용 지도는 **네이버 장소 지도 임베드**입니다(`m.place.naver.com/place/{id}/location`, 키 불필요).
  상단 헤더·탭 영역은 CSS(`.map__canvas--naver`)로 잘라내 지도만 보이게 처리했습니다.
- `.env` 에 `VITE_NAVER_MAP_CLIENT_ID`(네이버 클라우드 Maps 키)를 넣으면
  임베드 대신 **네이버 Dynamic Map**(직접 그린 마커)으로 자동 전환됩니다.
- 정확한 위치·길찾기는 앱 연결 버튼으로 처리합니다:
  - **네이버지도**: 확인된 장소 단축링크로 앱/웹에 정확히 연결
  - **카카오맵 · 티맵**: 좌표 기반 길찾기(`kakaomap://route`, `tmap://route`)로
    도착지가 채워진 화면이 바로 열립니다. 앱 미설치 시 카카오맵은 장소 링크,
    티맵은 스토어로 폴백합니다.
- 장소를 바꾸려면 `src/data/event.ts` 의 `naverPlaceUrl`, `kakaoPlaceUrl`,
  `naverPlaceId`, `venueCoord`, `venueAddress` 값을 수정하세요.
  (`naverPlaceId` 는 `naver.me` 단축링크를 열었을 때 주소창의 `/place/{숫자}` 값)

## 공유 이미지(OG)

`public/og-image.png` (1200×630). 카카오톡 공유 시 노출됩니다.
`index.html` 의 `og:url`/`og:image` 는 현재 배포 도메인
(`https://friend-in-visitation-day.vercel.app/`)을 가리키고 있으며,
도메인이 바뀌면 함께 수정해야 합니다.

이미지 원본은 `scripts/og-template.html` 이며, 왼쪽에 포스터·오른쪽에 행사 정보를 둔 구성입니다.
포스터나 문구를 바꾼 뒤 아래 명령으로 다시 뽑으면 됩니다.
(윈도우 크롬은 상대경로 저장이 실패하므로 **절대경로**로 넘겨야 합니다.)

```
chrome --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=6000 \
  --screenshot=C:\...\public\og-image.png C:\...\scripts\og-template.html
```

카카오톡은 OG 정보를 캐시하므로, 교체 후 `og:image` 뒤의 `?v=` 숫자를 올리고
[카카오 캐시 초기화](https://developers.kakao.com/tool/clear/og) 에서 URL을 한 번 긁어 주세요.

## Vercel 배포

1. 이 저장소를 GitHub에 push
2. Vercel → New Project → 저장소 선택
3. Framework Preset: **Vite** (자동 인식), 그대로 Deploy
4. (선택) Settings → Environment Variables 에 `VITE_NAVER_MAP_CLIENT_ID` 추가

# SAFECHOICE Frontend

피싱·스캠 대응 **행동 선택 기반 교육 시뮬레이션 서비스** SAFECHOICE의 프론트엔드 레포지토리다.

백엔드(FastAPI)는 이미

- 세션 생성
- step 기반 시나리오 엔진
- 이벤트 수집(`/events`)
- 분석/리포트(`/reports/{session_id}`)

까지 구현되어 있고,

프론트는 다음을 담당한다.

- 시뮬레이션 UI 렌더
- 사용자 행동 이벤트 전송
- 시뮬레이션 종료 후 결과 리포트 시각화

---

## 1. 프로젝트 목표 (MVP)

### MVP 사용자 흐름

1. 시뮬레이션 시작
2. step 메시지 확인
3. 옵션 클릭 → 이벤트 전송
4. 다음 step 렌더 반복
5. 종료 시 리포트 화면 이동
6. 분석 결과 확인

### 프론트 MVP 범위

- `POST /sessions/`로 세션 시작 + 첫 step 수신
- `POST /events/`로 이벤트 전송 + 다음 step 수신
- `GET /reports/{session_id}`로 리포트 조회
- UI는 “설명 가능한 단순함” 우선 (과한 디자인/복잡한 상태관리 금지)

---

## 2. 기술 스택

- Next.js (App Router)
- React + TypeScript
- fetch 기반 API 호출
- 환경변수 기반 API Base URL 관리

---

## 3. 로컬 실행 방법

### 3.1 환경 변수

프로젝트 루트에 `.env.local` 생성:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

### 3.2 실행

```bash
npm install
npm run dev
```

- FE: `http://localhost:3000`
- BE Swagger: `http://127.0.0.1:8000/docs`

---

## 4. 디렉토리 구조

```text
safechoice-frontend/
 ├─ app/
 │  ├─ page.tsx                 # / → /simulate 리다이렉트
 │  ├─ simulate/
 │  │  └─ page.tsx              # 시뮬레이션 실행 화면
 │  └─ report/
 │     └─ [sessionId]/
 │        └─ page.tsx           # 결과 리포트 화면
 │
 ├─ features/
 │  ├─ session/
 │  │  └─ api.ts                # POST /sessions/
 │  └─ simulation/
 │     └─ api.ts                # POST /events/
 │
 └─ shared/
    ├─ api/
    │  └─ client.ts             # fetch wrapper (BASE_URL)
    └─ types/
       └─ domain.ts             # Step / Session / Event / Report 타입
```

원칙:

- `app/`는 라우팅과 화면만
- API 호출/도메인 로직은 `features/`, 공용은 `shared/`

---

## 5. 백엔드 API 계약 (FE 기준)

### 5.1 Health

- `GET /health`

### 5.2 세션 생성

- `POST /sessions/`
- 응답: `session_id` + `step`

예시(형태만):

```json
{
  "session_id": "uuid",
  "step": {
    "id": "step_1",
    "message": { "sender": "bank", "text": "..." },
    "options": [
      { "id": "ignore", "label": "무시" },
      { "id": "reply", "label": "응답" }
    ]
  }
}
```

### 5.3 이벤트 전송

- `POST /events/`
- 요청 payload 핵심:

```json
{
  "session_id": "uuid",
  "type": "click",
  "payload": {
    "current_step_id": "step_1",
    "option_id": "ignore",
    "step_index": 1,
    "trigger": "urgency",
    "verification": false
  },
  "timestamp": "2026-02-05T12:00:00"
}
```

- 응답:
  - 진행 중: `{ step: {...}, ended: false }` 형태 또는 `{ step: {...} }` (백엔드 구현에 따름)
  - 종료: `{ ended: true }`

### 5.4 리포트 조회

- `GET /reports/{session_id}`
- 리포트 형태는 백엔드 도메인에 맞춰 FE에서 표시

---

## 6. 현재 구현 상태 (작성 시점)

### 완료

- [x] Next.js 프로젝트 세팅
- [x] `.env.local` 기반 BASE_URL 적용
- [x] `/simulate` 라우팅 구성
- [x] `POST /sessions/` 연동 (세션 생성 + 첫 step 렌더)
- [x] 버튼 클릭 이벤트 동작 확인
- [x] `POST /events/` 연동 확인 (Network에서 요청 확인됨)
- [x] 백엔드 응답 step 구조를 FE 계약(`id`, `message`, `options[]`)에 맞게 통일

### 이슈/메모

- `step.message`는 문자열이 아니라 객체 `{ sender, text }` 형태일 수 있음
  → 렌더 시 `step.message.text`로 표시해야 함 (객체 그대로 렌더하면 React 에러남)

### 남음 (다음 작업)

- [ ] 시뮬레이션 UI 정리 (StepCard/OptionButton 같은 최소 컴포넌트 분리)
- [ ] step 전환 루프 안정화 (ended 처리, stepIndex 증가, 예외 처리)
- [ ] 종료 시 `/report/{sessionId}` 이동
- [ ] `GET /reports/{sessionId}` 연동
- [ ] 리포트 화면 시각화(점수/취약 트리거/피드백 텍스트)
- [ ] 로딩/에러 UX 최소화

---

## 7. 트러블슈팅

### 7.1 CORS

- 브라우저에서 BE 호출 실패 시, BE에 CORS 설정 필요
- BE allow_origins: `http://localhost:3000`

### 7.2 `/events`가 Network에 안 뜸

- onClick 자체가 안 먹는 케이스와 구분해야 함
- 임시로 `handleClick`에 console.log 찍어서 호출 여부 확인
- 최악이면 페이지에서 직접 fetch로 우회해 “도달 여부”부터 확인

### 7.3 400 Bad Request

- 보통 `current_step_id` 또는 `option_id` 누락
- `/sessions/` 응답 step 구조가 FE 타입과 일치하는지 확인

### 7.4 React “Objects are not valid as a React child”

- `step.message`가 객체일 때 발생
- `step.message.text`로 렌더

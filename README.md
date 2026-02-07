# 🛡️ Phishing Insight: AI 기반 체험형 피싱 대응력 진단 솔루션

> **"나는 당하지 않는다"는 과신을 깨고, 실전 대화로 방어 기제를 형성합니다.**
> 실제 사건 보고서를 학습한 AI 가해자와의 1:1 시뮬레이션을 통해 개인의 심리적 취약점을 정밀 진단하고 맞춤형 대응 가이드를 제공하는 차세대 예방 교육 플랫폼입니다.

---

## 🌟 Key Features

### 1. 사건 보고서 기반 AI 페르소나 주입 (Admin)

* **Case-to-Persona**: 관리자가 실제 범죄 사례(PDF/텍스트)를 업로드하면, AI가 가해자의 말투, 회유 수법, 요구 사항을 분석하여 시뮬레이션 환경에 즉시 반영합니다.
* **실전적 시나리오**: 정형화된 시나리오가 아닌, 사용자의 답변에 따라 실시간으로 변하는 지능형 공격 로직을 제공합니다.

### 2. 적응형 피싱 시뮬레이션 (Simulation)

* **실시간 개인정보 탐지**: 대화 중 주소, 계좌번호, 전화번호 등 민감 정보가 유출되는 시점을 즉각 감지합니다.
* **반응형 대화 엔진**: LLM(GPT-4o)을 활용하여 사용자의 의심이나 반박에도 유연하게 대처하며 범죄 상황을 재현합니다.

### 3. 정밀 진단 리포트 (Diagnosis)

* **취약점 시각화**: 권위 복종, 심리적 압박, 이익 유혹 등 5가지 지표를 바탕으로 사용자의 심리적 취약도를 방사형 차트로 시각화합니다.
* **복기(Review) 시스템**: 대화 내역 중 실제 정보 유출이 발생한 지점을 하이라이트하여 개인별 주의 사항을 피드백합니다.

---

## 🛠 Tech Stack

### Frontend

* **Framework**: Next.js 15+ (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS 4 (Mobile-First Responsive Design)
* **Visualization**: Recharts (Radar/Bar Charts)

### AI & Data

* **Engine**: OpenAI GPT-4o API
* **State Management**: LocalStorage (Persist session data without external DB)
* **Logic**: Regex-based PII (Personally Identifiable Information) Detector

---

## 📱 Responsive Experience

본 서비스는 다양한 디바이스 환경에서 최적화된 시각적 경험을 제공합니다.

* **Mobile**: 실제 메신저 앱을 사용하는 듯한 긴박감 있는 채팅 환경 제공.
* **Desktop**: 관리자 설정, 실시간 감지 로그, 상세 리포트를 한눈에 파악할 수 있는 대시보드 구조.

---

## 🚀 Quick Start (Development)

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 OpenAI API Key를 입력합니다.

```env
OPENAI_API_KEY=your_openai_api_key_here

```

### 2. 의존성 설치 및 실행

```bash
npm install
npm run dev

```

### 3. 시뮬레이션 시작

1. `/admin` 페이지 접속: 실제 사례(Mock)를 분석하여 시나리오를 설정합니다.
2. `/simulate` 페이지 이동: AI 가해자와의 대화를 진행합니다.
3. `/report/[sessionId]` 확인: 대화 종료 후 생성된 진단 리포트를 분석합니다.

---

## 📈 Roadmap

* [x] LLM 기반 가변형 피싱 대화 엔진 구축
* [x] 실시간 개인정보 노출 감지 로직 구현
* [x] 방사형 취약점 진단 차트 시스템
* [ ] 실제 범죄 녹취 기반 Voice-to-Voice 시뮬레이션 (지원 예정)
* [ ] 금융기관 이상거래 탐지 시스템(FDS) 연동 API 개발 (지원 예정)

---

**Phishing Insight**는 기술로 사람을 보호하고, 더 안전한 디지털 금융 세상을 만듭니다.

---
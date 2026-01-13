# AI Visual Translator Evaluator (AI 시각 번역기 평가 도구)

**VisualTrans AI**는 이미지를 입력으로 받아 텍스트를 추출(OCR)하고, 번역(Translation)한 뒤 배경 복원(Inpainting)과 텍스트 합성(Synthesis)을 수행하는 **엔드투엔드 AI 시각 번역 파이프라인**를 웹에서 시각적으로 검증·평가하는 플랫폼입니다.

번역 결과의 **정확도·의미 보존·품질 안정성**을 정량/정성적으로 평가하는 것을 목표로 합니다.

---

## 🌟 주요 기능 (v1.0 Beta)

### 1. 🌏 다국어 번역 지원 (Multi-Language Support)

* **도착 언어(Target Language) 선택**: 사용자가 번역 결과 언어를 직접 지정
* **지원 언어**: 한국어(Korean), 영어(English), 중국어(Chinese), 일본어(Japanese), 스페인어(Spanish), 프랑스어(French)
* 언어별 특성을 반영한 **OpenAI 프롬프트 자동 최적화**

---

### 2. 🎨 프리미엄 UI/UX & 한국어 최적화

* **Glassmorphism UI**: 투명 카드, 블러 효과, 부드러운 전환 애니메이션
* **완전 한글화**: 모든 UI, 에러 메시지, 평가 리포트 한국어 제공
* **반응형 웹**: 데스크톱 / 태블릿 / 모바일 대응

---

### 3. 🚦 7단계 AI 처리 파이프라인 시각화

이미지 업로드부터 결과 출력까지의 전 과정을 단계별로 시각화합니다.

`Upload` → `OCR` → `Translation` → `Inpainting` → `Synthesis` → `Back-Translation` → `Output`

* 각 단계별 **진행 상태 / 성공·실패 여부 / 결과 미리보기** 제공
* 파이프라인 디버깅 및 데모 시연에 최적화

---

### 4. 📊 AI 기반 품질 평가 대시보드

* **OpenAI GPT-4o** 기반 평가 분석
* **의미 유사도(Semantic Similarity)** 점수 산출
* **품질 체크리스트 자동 검증**

  * 제품명 유지 여부
  * 핵심 정보(성분, 카테고리 등) 보존 여부
* **역번역(Back-Translation)**을 통한 오역·의미 손실 탐지

---

## 🛠️ 기술 스택 (Tech Stack)

### 🔹 Backend (AI Core)

* **Language**: Python 3.10+
* **Framework**: FastAPI
* **Architecture**: Modular Pipeline 구조

  * `OCREngine`: EasyOCR
  * `Translator`: OpenAI GPT-3.5 / GPT-4o
  * `Inpainter`: OpenCV (Telea Algorithm)
  * `TextRenderer`: Pillow (PIL)
* **Database**: MongoDB (Motor Async Driver)
* **Env 관리**: python-dotenv

---

### 🔹 Frontend (Web UI)

* **Framework**: React 18 (Vite)
* **Styling**: Tailwind CSS v4
* **Icons**: Lucide Icons
* **Language**: JavaScript (ES6+)
* **UX 포인트**:

  * 단계별 파이프라인 시각화
  * 실시간 상태 피드백
  * 평가 결과 카드형 리포트

---

## 📦 설치 및 실행 가이드

### 1. 필수 요구사항

* Python 3.8 이상
* Node.js 18 이상
* MongoDB (Local 또는 Atlas)

---

### 2. 백엔드 서버 실행 (Port: 8000)

프로젝트 루트 폴더에서 실행합니다.

```bash
pip install -r requirements.txt
python run_server.py
```

> ⚠️ **중요**
>
> * `uvicorn main:app` 직접 실행 시 일부 환경에서 OMP 관련 충돌이 발생할 수 있습니다.
> * 반드시 `run_server.py` 사용을 권장합니다.

#### 🔑 API 키 설정

`.env` 파일에 OpenAI API 키를 설정합니다.

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
```

* 키가 없거나 유효하지 않은 경우 **자동으로 Mock(Demo) 모드**로 전환
* UI 및 전체 파이프라인 테스트 가능

---

### 3. 프론트엔드 실행 (Port: 5173)

```bash
cd frontend
npm install
npm run dev
```

---

### 4. 접속

브라우저에서 아래 주소로 접속합니다.

```
http://localhost:5173
```

---

## 🔐 보안 및 안정성

* API Key는 **서버에서만 사용** (클라이언트 노출 없음)
* 키 오류(401 Unauthorized) 발생 시:

  * 자동 Mock 응답 처리
  * 서비스 중단 없이 UI 유지

##

## 캡쳐

<img width="1896" height="912" alt="image" src="https://github.com/user-attachments/assets/21d7454b-eefc-4e68-a7b5-f08132b3140b" />
<img width="1893" height="894" alt="image" src="https://github.com/user-attachments/assets/d1f91ace-b85f-4bb3-82f2-da5d88a2f902" />


<img width="1442" height="619" alt="image" src="https://github.com/user-attachments/assets/a70bde45-a42e-405d-b0a0-00336675d3f6" />
<img width="1394" height="673" alt="image" src="https://github.com/user-attachments/assets/d6475a19-03bb-4272-8d2e-08f18a376c8a" />
<img width="754" height="408" alt="image" src="https://github.com/user-attachments/assets/a512f976-a404-4b30-a73a-6d098321e77c" />



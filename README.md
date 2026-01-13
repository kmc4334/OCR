# AI Visual Translator Evaluator (AI 시각 번역기 평가 도구)

**VisualTrans AI**는 실시간으로 이미지를 분석하여 텍스트를 추출(OCR), 번역(Translation), 그리고 배경 복원(Inpainting) 및 합성(Synthesis)하는 전체 AI 파이프라인을 시각적으로 검증하고 평가하는 웹 플랫폼입니다.

## 🌟 주요 업데이트 및 기능 (v1.0 Beta)

### 1. 🌏 다국어 번역 지원 (Multi-Language Support)
- **언어 선택 기능**: 사용자가 번역하고 싶은 **도착 언어(Target Language)**를 직접 선택할 수 있습니다.
- **지원 언어**: 한국어(Korean), 영어(English), 중국어(Chinese), 일본어(Japanese), 스페인어(Spanish), 프랑스어(French).
- 각 언어에 맞춘 AI 번역 최적화 프롬프트가 자동으로 적용됩니다.

### 2. 🎨 프리미엄 UI/UX & 한국어 최적화
- **Glassmorphism Design**: 최신 트렌드를 반영한 투명 유리 패널 디자인과 부드러운 애니메이션 효과 적용.
- **완벽한 한글화**: 모든 인터페이스, 메뉴, 안내 메시지, 결과 리포트가 **자연스러운 한국어**로 제공됩니다.
- **반응형 웹**: 데스크탑 및 모바일 환경에 최적화된 레이아웃.

### 3. 🚦 7단계 실시간 파이프라인 시각화
- 이미지 업로드부터 최종 출력까지의 복잡한 AI 처리 과정을 7단계로 나누어 시각적으로 보여줍니다.
- 단계: `Upload` → `OCR` → `Translation` → `Inpainting` → `Synthesis` → `Back-Trans` → `Output`

### 4. 📊 AI 기반 품질 정밀 평가 Dashboard
- **OpenAI GPT-4o**를 활용한 심층 분석 리포트를 제공합니다.
- **의미 유사도(Semantic Similarity)** 점수 측정.
- **품질 체크리스트**: 제품명, 카테고리, 성분 정보 등의 핵심 정보 유지 여부를 O/X로 검증.
- **역번역(Back-Translation)** 검증을 통한 오역 방지.

---

## 🛠️ 기술 스택 (Tech Stack)

### Backend (AI Core)
- **Framework**: FastAPI (Python 3.10+)
- **AI Core**: OpenAI API (GPT-4o/3.5-turbo), EasyOCR, OpenCV, PyTorch
- **Database**: MongoDB (Motor Async Driver)

### Frontend (User Interface)
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS v4, Lucide Icons
- **Language**: JavaScript (ES6+)

---

## 📦 설치 및 실행 가이드

### 1. 필수 요구사항
- Python 3.8 이상
- Node.js 18 이상
- MongoDB (로컬 실행 또는 Atlas 클라우드 URL)

### 2. 백엔드 서버 실행 (Port: 8000)
프로젝트 루트 폴더(`OCR2`)에서 다음 명령어를 실행합니다.

```bash
# 가상환경 활성화 권장
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```
> **API 키 설정**: `.env` 파일에 `OPENAI_API_KEY`를 설정하면 실제 번역이 수행되며, 설정하지 않으면 **데모(Mock) 데이터**로 동작하여 안전하게 UI를 테스트할 수 있습니다.

### 3. 프론트엔드 실행 (Port: 5173)
`frontend` 폴더로 이동하여 실행합니다.

```bash
cd frontend
npm install
npm run dev
```

### 4. 접속
브라우저에서 [http://localhost:5173](http://localhost:5173) 주소로 접속하세요.

---

## 🧪 문제 해결 (Troubleshooting)

- **API 키 오류 (401 Error)**: `.env` 파일의 `OPENAI_API_KEY`가 정확한지, 공백이 없는지 확인하세요. 오류가 지속되면 `verify_api_key_v2.py` 스크립트를 실행하여 진단할 수 있습니다.
- **업로드 멈춤**: 백엔드 서버(`uvicorn`)가 켜져 있는지 확인하세요.
- **언어 지원**: 현재 EasyOCR 모델 호환성 문제로 일부 언어 조합(예: 중국어 번체)에서 텍스트 감지가 제한될 수 있습니다. (현재 한국어/영어 최적화됨)

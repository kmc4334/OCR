import { useState } from 'react'
import ImageUpload from './components/ImageUpload'
import EvaluationResult from './components/EvaluationResult'
import ProcessingSteps from './components/ProcessingSteps'
import { Github, Globe, Menu, ShieldCheck, Zap, Bot, ArrowRight } from 'lucide-react'

function App() {
  const [result, setResult] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">

      {/* 1. Navbar */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Bot size={24} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
                VisualTrans<span className="font-light text-slate-800">AI</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">기능 소개</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">작동 원리</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">문서</a>
            </div>

            {/* CTA / Action */}
            <div className="flex items-center gap-4">
              <a href="https://github.com/your-repo" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-black transition-colors">
                <Github size={20} />
              </a>
              <button className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:shadow-slate-300 transform hover:-translate-y-0.5">
                <span>시작하기</span>
                <ArrowRight size={16} />
              </button>
              <button className="md:hidden text-slate-600">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white -z-10"></div>

        <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            베타 버전 1.0 라이브
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            언어의 장벽을 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              시각적으로, 즉각적으로.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            차세대 AI 파이프라인을 경험하세요: OCR 텍스트 추출, 신경망 번역, 그리고 문맥 인식 이미지 합성을 한 번에.
          </p>

          <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <button className="px-8 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:shadow-blue-300">
              무료 데모 체험
            </button>
            <button className="px-8 py-3.5 rounded-xl bg-white text-slate-700 border border-slate-200 font-bold text-lg hover:bg-slate-50 transition-all">
              문서 보기
            </button>
          </div>
        </div>
      </header>

      {/* 3. Main Application Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Step Indicator */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">실시간 처리 파이프라인</h2>
            <p className="text-slate-500">AI가 이미지를 분석하고 변환하는 과정을 실시간으로 확인하세요.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <ProcessingSteps currentStep={currentStep} />
          </div>
        </div>

        {/* Main Workspace (Split Layout) */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left: Upload */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap size={120} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 relative z-10">이미지 입력</h3>
              <ImageUpload onResult={setResult} onStepChange={setCurrentStep} />
            </div>

            {/* Feature List (Micro-copy) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-50">
                <ShieldCheck className="text-blue-600 mb-2" size={20} />
                <h4 className="font-bold text-slate-800 text-sm">보안 처리</h4>
                <p className="text-xs text-slate-500 mt-1">데이터는 실시간으로 처리됩니다.</p>
              </div>
              <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-50">
                <Globe className="text-purple-600 mb-2" size={20} />
                <h4 className="font-bold text-slate-800 text-sm">다국어 지원</h4>
                <p className="text-xs text-slate-500 mt-1">한국어, 영어, 중국어 등 지원.</p>
              </div>
            </div>
          </div>

          {/* Right: Results or Placeholder */}
          <div className="lg:col-span-7">
            {result ? (
              <div className="animate-fade-in">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 min-h-[500px]">
                  <EvaluationResult data={result} />
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[500px] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-12">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
                  <Bot size={48} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">번역 준비 완료</h3>
                <p className="text-slate-400 max-w-sm">왼쪽에 이미지를 업로드하여 AI 평가 파이프라인을 시작하세요.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded text-white">
                <Bot size={20} />
              </div>
              <span className="text-xl font-bold text-white">VisualTrans AI</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              최첨단 시각 번역 기술로 전 세계의 소통을 돕습니다. FastAPI와 React로 구축되었습니다.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">제품</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">기능</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">연동</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">가격</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">리소스</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">문서</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">API 참조</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">커뮤니티</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © 2024 VisualTrans AI. All rights reserved.
        </div>
      </footer>

    </div>
  )
}

export default App

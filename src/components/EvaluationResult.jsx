import { CheckCircle, XCircle, AlertTriangle, Activity, SpellCheck, Image as ImageIcon } from 'lucide-react';

export default function EvaluationResult({ data }) {
    if (!data) return null;

    const { evaluation } = data;
    const isPass = evaluation.result === "PASS";

    // Calculate score color
    const score = evaluation.semantic_similarity * 100;
    const scoreColor = score >= 90 ? 'text-green-600' : score >= 70 ? 'text-yellow-600' : 'text-red-600';
    const scoreBg = score >= 90 ? 'bg-green-100' : score >= 70 ? 'bg-yellow-100' : 'bg-red-100';

    return (
        <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Activity className="text-blue-600" />
                Analysis Report
            </h2>

            {/* Top Summary Dashboard */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Pass/Fail Card */}
                <div className={`p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center
                     ${isPass ? 'bg-gradient-to-br from-green-50 to-white' : 'bg-gradient-to-br from-red-50 to-white'}`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isPass ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {isPass ? <CheckCircle size={32} /> : <XCircle size={32} />}
                    </div>
                    <div className="text-sm text-slate-500 font-semibold uppercase tracking-wider">평가 결과</div>
                    <div className={`text-3xl font-extrabold mt-1 ${isPass ? 'text-green-700' : 'text-red-700'}`}>{isPass ? "PASS" : "FAIL"}</div>
                </div>

                {/* Similarity Score */}
                <div className="p-6 rounded-2xl shadow-sm border border-slate-100 bg-white flex flex-col items-center justify-center text-center">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 mb-2 ${score >= 90 ? 'border-green-500' : score >= 70 ? 'border-yellow-500' : 'border-red-500'}`}>
                        <span className={`text-3xl font-bold ${scoreColor}`}>
                            {score.toFixed(0)}<span className="text-sm">%</span>
                        </span>
                    </div>
                    <div className="text-sm text-slate-500 font-semibold uppercase tracking-wider">의미 유사도</div>
                </div>

                {/* Summary Text */}
                <div className="p-6 rounded-2xl shadow-sm border border-slate-100 bg-white flex flex-col justify-center">
                    <div className="text-sm text-slate-400 font-bold uppercase mb-2">AI 요약</div>
                    <p className="text-slate-700 leading-relaxed font-medium">"{evaluation.summary}"</p>
                </div>
            </div>

            {/* Detail Grid */}
            <div className="grid lg:grid-cols-2 gap-8">

                {/* Left: Text Analysis */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
                        <SpellCheck className="text-indigo-500" />
                        번역 상세 분석
                    </h3>
                    <div className="space-y-6">
                        <div className="group">
                            <div className="flex justify-between mb-1">
                                <span className="text-xs font-bold text-slate-400 uppercase">원본 텍스트 (추출됨)</span>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl text-slate-700 border border-slate-200 group-hover:border-blue-300 transition-colors">
                                {data.original_text}
                            </div>
                        </div>
                        <div className="group">
                            <div className="flex justify-between mb-1">
                                <span className="text-xs font-bold text-slate-400 uppercase">번역 결과</span>
                            </div>
                            <div className="bg-blue-50/50 p-4 rounded-xl text-slate-800 font-medium border border-blue-100 group-hover:border-blue-300 transition-colors">
                                {data.translated_text}
                            </div>
                        </div>
                        <div className="group">
                            <div className="flex justify-between mb-1">
                                <span className="text-xs font-bold text-slate-400 uppercase">역번역 검증 (의미 확인)</span>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl text-slate-600 border border-slate-200 italic group-hover:border-blue-300 transition-colors">
                                {data.back_translated_text}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Quality Check */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
                        <CheckCircle className="text-teal-500" />
                        품질 체크리스트
                    </h3>

                    <div className="space-y-4">
                        {['product_name', 'category', 'ingredients'].map((key) => (
                            <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <span className="capitalize font-medium text-slate-700">
                                    {key === 'product_name' ? '제품명 일치' : key === 'category' ? '카테고리 유지' : '성분/내용 전달'}
                                </span>
                                {evaluation.keyword_match[key]
                                    ? <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold shadow-sm">일치 (MATCH)</span>
                                    : <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold shadow-sm">불일치 (MISMATCH)</span>
                                }
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <h4 className="text-sm font-bold text-slate-400 uppercase mb-3">감지된 이슈</h4>
                        <div className="flex flex-wrap gap-2">
                            {evaluation.error_type.map((error, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg text-sm font-medium flex items-center gap-1.5">
                                    <AlertTriangle size={14} /> {error}
                                </span>
                            ))}
                            {evaluation.error_type.length === 0 && (
                                <span className="px-3 py-1.5 bg-slate-100 text-slate-400 rounded-lg text-sm italic">
                                    발견된 이슈 없음
                                </span>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            {/* Image Gallery */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
                    <ImageIcon className="text-purple-500" />
                    시각적 검증
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <div className="aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner relative group">
                            <img src={data.localPreview || data.imageUrl} alt="Original" className="w-full h-full object-contain mix-blend-multiply" />
                            <span className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-md">원본 이미지</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner relative group">
                            <img src={data.translatedImageUrl || data.localPreview} alt="Translated" className="w-full h-full object-contain mix-blend-multiply" />
                            <span className="absolute top-3 left-3 bg-blue-600/80 text-white text-xs px-2 py-1 rounded backdrop-blur-md">AI 번역 결과</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

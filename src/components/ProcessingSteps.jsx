import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

const steps = [
    "이미지 업로드",
    "OCR 텍스트 추출",
    "AI 텍스트 번역",
    "배경 인페인팅",
    "텍스트 이미지 합성",
    "역번역 검증",
    "최종 결과 생성"
];

export default function ProcessingSteps({ currentStep }) {
    return (
        <div className="w-full py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;
                    const isPending = index > currentStep;

                    return (
                        <div key={index} className="flex flex-1 items-center md:flex-col md:justify-start gap-3 z-10 w-full md:w-auto group">
                            {/* Icon Container */}
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ease-out
                                ${isCompleted ? 'bg-green-500 border-green-500 text-white scale-100 shadow-md' : ''}
                                ${isCurrent ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-lg shadow-blue-200 ring-4 ring-blue-50' : ''}
                                ${isPending ? 'bg-white border-slate-200 text-slate-300 scale-90' : ''}
                            `}>
                                {isCompleted && <CheckCircle2 size={20} className="animate-in zoom-in duration-300" />}
                                {isCurrent && <Loader2 size={20} className="animate-spin" />}
                                {isPending && <Circle size={20} />}
                            </div>

                            {/* Label */}
                            <span className={`
                                text-sm font-medium transition-colors duration-300
                                ${isCurrent ? 'text-blue-700 font-bold translate-y-0 opacity-100' : 'text-slate-500'}
                                ${isCompleted ? 'text-green-600' : ''}
                                ${isPending ? 'opacity-60' : ''}
                            `}>
                                {step}
                            </span>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-5 left-0 h-[3px] bg-slate-100 -z-10 transition-all duration-1000"
                                    style={{
                                        left: `calc(${(index / (steps.length - 1)) * 100}% + 2.5rem)`,
                                        width: `calc(${100 / (steps.length - 1)}% - 5rem)`,
                                        backgroundColor: index < currentStep ? '#22c55e' : '#f1f5f9'
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

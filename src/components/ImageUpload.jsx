import { useState } from 'react';

export default function ImageUpload({ onResult, onStepChange }) {
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [targetLanguage, setTargetLanguage] = useState('Korean'); // Default to Korean

    const languages = [
        { code: 'Korean', label: '한국어 (Korean)' },
        { code: 'English', label: '영어 (English)' },
        { code: 'Chinese', label: '중국어 (Chinese)' },
        { code: 'Japanese', label: '일본어 (Japanese)' },
        { code: 'Spanish', label: '스페인어 (Spanish)' },
        { code: 'French', label: '프랑스어 (French)' },
    ];

    const readFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageDataUrl = await readFile(file);
        setPreview(imageDataUrl);
        await uploadImage(file, imageDataUrl);
    };

    const simulateSteps = async () => {
        // Steps: 0:Upload -> 1:OCR -> 2:Translate -> 3:Inpaint -> 4:Synthesis -> 5:BackTrans -> 6:Output -> 7:Done
        for (let i = 0; i <= 6; i++) {
            onStepChange(i);
            // Simulate processing time for each step (random between 500ms and 1500ms)
            await new Promise(r => setTimeout(r, Math.random() * 800 + 400));
        }
        onStepChange(7); // Completed
    };

    const uploadImage = async (file, currentPreview) => {
        setLoading(true);
        onResult(null); // Reset previous result

        try {
            // Start Step 0: Upload
            onStepChange(0);

            const formData = new FormData();
            formData.append('file', file);

            // Trigger steps simulation in parallel with the fetch if we want "fake" progress, 
            // BUT since this is a mock backend that returns instantly, we should await the simulation 
            // OR let the simulation run.
            // Let's run simulation first to visualize the pipeline 'doing work'

            const stepPromise = simulateSteps();

            // Pass target_language as query param
            const response = await fetch(`http://localhost:8000/process-image?target_language=${targetLanguage}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || 'Upload failed');
            }

            const data = await response.json();

            // Wait for visual steps to finish if they are still running
            await stepPromise;

            // Pass both API data and local preview URL
            onResult({ ...data, localPreview: currentPreview });
        } catch (error) {
            console.error(error);
            alert(`오류가 발생했습니다: ${error.message}`);
            onStepChange(0); // Reset or Error state
        } finally {
            setLoading(false);
        }
    };

    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 업로드할 수 있습니다.');
            return;
        }

        const imageDataUrl = await readFile(file);
        setPreview(imageDataUrl);
        await uploadImage(file, imageDataUrl);
    };

    return (
        <div className="space-y-4">
            {/* Language Selection */}
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label className="text-sm font-bold text-slate-700 min-w-max">번역 도착 언어:</label>
                <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    disabled={loading}
                    className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-all hover:border-blue-400"
                >
                    {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.label}
                        </option>
                    ))}
                </select>
            </div>

            <div
                className={`
                    relative group cursor-pointer
                    p-10 border-2 border-dashed rounded-2xl transition-all duration-300 ease-in-out
                    flex flex-col justify-center items-center h-80
                    ${isDragging
                        ? 'border-blue-500 bg-blue-50/50 scale-[1.02] shadow-xl'
                        : 'border-slate-300 bg-slate-50/50 hover:border-blue-400 hover:bg-white hover:shadow-lg'}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    disabled={loading}
                />
                <label
                    htmlFor="file-upload"
                    className={`w-full h-full flex flex-col justify-center items-center ${loading ? 'cursor-wait' : 'cursor-pointer'}`}
                >
                    {loading ? (
                        <div className="text-center space-y-4">
                            <div className="relative w-16 h-16 mx-auto">
                                <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                            </div>
                            <div>
                                <p className="text-blue-700 font-bold text-lg">이미지 분석 중...</p>
                                <p className="text-blue-500 text-sm">AI가 콘텐츠를 분석하고 번역하는 중입니다.</p>
                            </div>
                        </div>
                    ) : preview ? (
                        <div className="relative w-full h-full flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                            <img src={preview} alt="Preview" className="max-h-full max-w-full rounded-lg shadow-md object-contain" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                <p className="text-white font-semibold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">이미지를 교체하려면 클릭</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-slate-700">이미지를 끌어다 놓으세요</p>
                                <p className="text-slate-500 mt-1">또는 <span className="text-blue-600 hover:underline">파일 찾아보기</span></p>
                            </div>
                            <p className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full inline-block">지원 형식: JPG, PNG, WEBP</p>
                        </div>
                    )}
                </label>
            </div>
        </div>
    );
}

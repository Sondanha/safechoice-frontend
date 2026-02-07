'use client';

import { useState } from 'react';

interface ScenarioUploaderProps {
    onAnalysisComplete: (mockData: { persona: string; rules: string[]; caseTitle: string }) => void;
}

/**
 * 사례 분석(PDF 업로드) 컴포넌트
 */
export const ScenarioUploader = ({ onAnalysisComplete }: ScenarioUploaderProps) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleUploadClick = () => {
        setIsAnalyzing(true);

        // 시나리오 시뮬레이션을 위한 3초 지연 연출
        setTimeout(() => {
            setIsAnalyzing(false);
            onAnalysisComplete({
                persona: '보이스피싱 조직원 브로커 리. 급박한 목소리로 신용불량 위기를 강조하며 대출 상환을 유도함.',
                rules: [
                    '대출 연체로 인해 통장이 압류될 것이라고 압박한다.',
                    '당장 상환하지 않으면 법적 조치가 취해진다고 경고한다.',
                    '직장 정보를 물어보며 상환 능력을 확인한다.',
                ],
                caseTitle: '저금리 대출 갈아타기 유도 피싱',
            });
        }, 3000);
    };

    return (
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-inner transition-all hover:border-blue-400">
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-blue-100 rounded-full">
                    {isAnalyzing ? (
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    )}
                </div>

                <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-800">
                        {isAnalyzing ? '실제 피싱 사례 리포트 분석 중...' : '사례 분석 (PDF/Text Upload)'}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {isAnalyzing ? 'AI가 가해자의 말투와 범죄 수법을 학습하고 있습니다.' : '실제 범죄 리포트를 업로드하여 AI 페르소나를 생성하세요.'}
                    </p>
                </div>

                <button
                    onClick={handleUploadClick}
                    disabled={isAnalyzing}
                    className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-transform active:scale-95 ${isAnalyzing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isAnalyzing ? '분석 중...' : '파일 선택 및 학습 시작'}
                </button>
            </div>
        </div>
    );
};

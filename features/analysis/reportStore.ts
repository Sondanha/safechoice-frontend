import { SessionData, DetectedInfo } from '../../shared/types/domain';

export interface DiagnosisScore {
    subject: string;
    A: number;
    fullMark: number;
}

/**
 * 대화 내역을 바탕으로 심리적 취약점을 분석합니다.
 */
export const analyzeVulnerability = (session: SessionData): DiagnosisScore[] => {
    const { messages, detectedInfos } = session;
    const totalLength = messages.length;

    // 단순 예시 로직: 탐지된 정보 조각과 대화 길이를 바탕으로 점수 산출
    const piiCount = detectedInfos.length;

    return [
        { subject: '권위 복종', A: Math.min(20 + piiCount * 15, 100), fullMark: 100 },
        { subject: '심리적 압박', A: Math.min(10 + totalLength * 5, 100), fullMark: 100 },
        { subject: '이익 유혹', A: session.settings.category === 'ROMANCE_SCAM' ? 80 : 40, fullMark: 100 },
        { subject: '신뢰 형성', A: Math.min(30 + totalLength * 3, 100), fullMark: 100 },
        { subject: '공포 유발', A: session.settings.category === 'VOICE_PHISHING' ? 70 : 30, fullMark: 100 },
    ];
};

/**
 * 텍스트 내에 탐지된 PII가 있는지 확인하여 하이라이팅을 위한 메타데이터를 반환합니다.
 */
export const getHighlightedContent = (content: string, detectedInfos: DetectedInfo[]) => {
    let highlighted = content;

    // 실제로 탐지된 값들을 찾아서 <mark> 태그로 감쌈 (단순 구현)
    detectedInfos.forEach(info => {
        if (content.includes(info.value)) {
            const regex = new RegExp(info.value, 'g');
            highlighted = highlighted.replace(regex, `<span class="bg-red-200 font-bold text-red-700 px-1 rounded">${info.value}</span>`);
        }
    });

    return highlighted;
};

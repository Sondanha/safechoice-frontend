import { useState, useCallback, useEffect } from 'react';
import { SessionData, ChatMessage } from '../../shared/types/domain';
import { storage } from '../../shared/utils/storage';
import { detectSensitiveInfo } from '../../shared/utils/detector';

/**
 * 시뮬레이션 로직을 관리하는 커스텀 훅
 */
export const useSimulation = (sessionId: string) => {
    const [session, setSession] = useState<SessionData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // 초기 세션 로드 또는 생성
    useEffect(() => {
        const savedSession = storage.getSession(sessionId);
        if (savedSession) {
            setSession(savedSession);
        } else {
            const adminSettings = storage.getAdminSettings();
            if (!adminSettings) return;

            const newSession: SessionData = {
                id: sessionId,
                settings: adminSettings,
                messages: [
                    {
                        id: 'init',
                        role: 'assistant',
                        content: adminSettings.category === 'VOICE_PHISHING'
                            ? '여보세요, 김철수 씨 되시나요? 여기 서울중앙지검 검찰청입니다.'
                            : '안녕하세요! 프로필 보고 연락 드렸어요. 혹시 대화 가능하신가요?',
                        createdAt: Date.now(),
                    }
                ],
                detectedInfos: [],
                isEnded: false,
            };
            setSession(newSession);
            storage.saveSession(newSession);
        }
    }, [sessionId]);

    const handleSendMessage = useCallback(async (content: string) => {
        if (!session || session.isEnded || isLoading) return;

        // 1. 사용자 메시지 추가
        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content,
            createdAt: Date.now(),
        };

        // 2. 개인정보 탐지
        const newDetectedInfos = detectSensitiveInfo(content);

        const updatedMessages = [...session.messages, userMessage];
        const updatedDetectedInfos = [...session.detectedInfos, ...newDetectedInfos];

        // 유출된 정보가 3개 이상이면 세션 종료 조건 (예시)
        const isEnded = updatedDetectedInfos.length >= 3;

        const updatedSession: SessionData = {
            ...session,
            messages: updatedMessages,
            detectedInfos: updatedDetectedInfos,
            isEnded,
        };

        setSession(updatedSession);
        storage.saveSession(updatedSession);

        if (isEnded) return;

        // 3. AI 응답 요청
        setIsLoading(true);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: updatedMessages,
                    settings: session.settings,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const aiMessage: ChatMessage = {
                    id: `ai-${Date.now()}`,
                    role: 'assistant',
                    content: data.content,
                    createdAt: Date.now(),
                };

                const finalSession = {
                    ...updatedSession,
                    messages: [...updatedSession.messages, aiMessage],
                };
                setSession(finalSession);
                storage.saveSession(finalSession);
            }
        } catch (error) {
            console.error('AI Response Error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [session, isLoading]);

    const handleEndSession = useCallback(() => {
        if (!session) return;
        const endedSession = { ...session, isEnded: true };
        setSession(endedSession);
        storage.saveSession(endedSession);
    }, [session]);

    return { session, isLoading, handleSendMessage, handleEndSession };
};

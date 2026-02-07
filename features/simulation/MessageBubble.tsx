import { ChatMessage } from '../../shared/types/domain';

interface MessageBubbleProps {
    message: ChatMessage;
}

/**
 * 채팅 메시지 버블 컴포넌트
 */
export const MessageBubble = ({ message }: MessageBubbleProps) => {
    const isUser = message.role === 'user';

    return (
        <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 mt-1 shrink-0 overflow-hidden">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>
            )}

            <div className={`max-w-[75%] space-y-1`}>
                {!isUser && <span className="text-[10px] text-gray-500 ml-1">상대방</span>}
                <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm transition-all ${isUser
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                        }`}
                >
                    {message.content}
                </div>
                <div className={`text-[9px] text-gray-400 ${isUser ? 'text-right mr-1' : 'text-left ml-1'}`}>
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
};

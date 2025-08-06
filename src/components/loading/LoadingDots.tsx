// components/LoadingDots.js
export default function LoadingDots() {
    return (
        <div className="flex space-x-2 items-center">
            <div className="dot w-2.5 h-2.5 bg-gray-600 rounded-full animate-bounce"></div>
            <div className="dot w-2.5 h-2.5 bg-gray-600 rounded-full animate-bounce200"></div>
            <div className="dot w-2.5 h-2.5 bg-gray-600 rounded-full animate-bounce400"></div>
            <style jsx>{`
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        .animate-bounce {
            animation: bounce 1s infinite;
        }

        .animate-bounce200 {
            animation: bounce 1s infinite 0.2s;
        }

        .animate-bounce400 {
            animation: bounce 1s infinite 0.4s;
        }
    `}</style>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { Loader2, Scan, Sparkles, CheckCircle2 } from "lucide-react";

const LOADING_MESSAGES = [
    "Subiendo imagen...",
    "Analizando estructura de la ventana...",
    "Detectando materiales...",
    "Identificando tipo de apertura...",
    "Generando descripción...",
    "Finalizando análisis..."
];

export default function AnalysisLoader() {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-xl p-6 text-center">
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                <div className="relative bg-white p-4 rounded-full shadow-lg border border-blue-100">
                    <Scan className="w-8 h-8 text-blue-600 animate-spin-slow" />
                </div>
                <div className="absolute -top-1 -right-1 bg-white p-1.5 rounded-full shadow-sm border border-purple-100 animate-bounce">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                IA Analizando Ventana
            </h3>

            <div className="h-6 overflow-hidden">
                <p className="text-sm text-gray-500 animate-fade-in-up key={messageIndex}">
                    {LOADING_MESSAGES[messageIndex]}
                </p>
            </div>

            <div className="w-48 h-1.5 bg-gray-100 rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-progress w-full origin-left" />
            </div>

            <style jsx>{`
                @keyframes progress {
                    0% { transform: scaleX(0); }
                    50% { transform: scaleX(0.7); }
                    100% { transform: scaleX(0.95); }
                }
                .animate-progress {
                    animation: progress 8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

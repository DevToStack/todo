'use client';

import { useState, useEffect } from 'react';

export default function ProgressRing({
    percentage = 0,
    color = 'blue',
    size = 60,
    strokeWidth = 6,
    animated = true,
    label,
    showLabel = false
}) {
    const [progress, setProgress] = useState(0);

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    const colors = {
        blue: {
            stroke: '#3b82f6',
            trail: '#dbeafe',
            text: '#1e40af'
        },
        green: {
            stroke: '#10b981',
            trail: '#d1fae5',
            text: '#065f46'
        },
        purple: {
            stroke: '#8b5cf6',
            trail: '#ede9fe',
            text: '#5b21b6'
        },
        yellow: {
            stroke: '#f59e0b',
            trail: '#fef3c7',
            text: '#92400e'
        },
        red: {
            stroke: '#ef4444',
            trail: '#fee2e2',
            text: '#991b1b'
        }
    };

    const colorSet = colors[color] || colors.blue;

    useEffect(() => {
        if (animated) {
            let start = 0;
            const end = percentage;
            const duration = 1000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setProgress(end);
                    clearInterval(timer);
                } else {
                    setProgress(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        } else {
            setProgress(percentage);
        }
    }, [percentage, animated]);

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    stroke={colorSet.trail}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />

                {/* Progress circle */}
                <circle
                    stroke={colorSet.stroke}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                        transition: 'stroke-dashoffset 0.35s',
                        transform: 'rotate(90deg)',
                        transformOrigin: '50% 50%',
                    }}
                />
            </svg>

            {/* Center label */}
            {showLabel && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span
                        className="text-sm font-bold"
                        style={{ color: colorSet.text }}
                    >
                        {label || `${Math.round(progress)}%`}
                    </span>
                </div>
            )}
        </div>
    );
}

// Alternative progress bar component
export function ProgressBar({
    percentage = 0,
    color = 'blue',
    height = 8,
    animated = true,
    showLabel = false,
    labelPosition = 'right'
}) {
    const [progress, setProgress] = useState(0);

    const colors = {
        blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
        green: 'bg-gradient-to-r from-green-500 to-green-600',
        purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
        yellow: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
        red: 'bg-gradient-to-r from-red-500 to-red-600',
    };

    useEffect(() => {
        if (animated) {
            let start = 0;
            const end = percentage;
            const duration = 800;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setProgress(end);
                    clearInterval(timer);
                } else {
                    setProgress(start);
                }
            }, 16);

            return () => clearInterval(timer);
        } else {
            setProgress(percentage);
        }
    }, [percentage, animated]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-1">
                {showLabel && labelPosition === 'left' && (
                    <span className="text-sm font-medium text-gray-700">
                        {Math.round(progress)}%
                    </span>
                )}
                {showLabel && labelPosition === 'right' && (
                    <span className="text-sm font-medium text-gray-700">
                        {Math.round(progress)}%
                    </span>
                )}
            </div>

            <div
                className="w-full bg-gray-200 rounded-full overflow-hidden"
                style={{ height: `${height}px` }}
            >
                <div
                    className={`h-full rounded-full ${colors[color]} transition-all duration-500 ease-out`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}
'use client';

import { useState, useEffect } from 'react';
import ProgressRing from './ProgressRing';
import { FiTrendingUp, FiTrendingDown, FiMoreVertical } from 'react-icons/fi';

export default function StatsCard({
    title,
    value,
    icon,
    color = 'blue',
    trend,
    percentage = 0,
    loading = false,
    onClick
}) {
    const [animatedValue, setAnimatedValue] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Animate value change
    useEffect(() => {
        if (typeof value === 'number') {
            let start = 0;
            const end = value;
            const duration = 800;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setAnimatedValue(end);
                    clearInterval(timer);
                } else {
                    setAnimatedValue(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [value]);

    const getColorClasses = (type) => {
        const colors = {
            blue: {
                bg: 'bg-blue-50',
                text: 'text-blue-700',
                accent: 'bg-blue-500',
                gradient: 'from-blue-500 to-blue-600',
                light: 'bg-blue-100',
            },
            green: {
                bg: 'bg-green-50',
                text: 'text-green-700',
                accent: 'bg-green-500',
                gradient: 'from-green-500 to-green-600',
                light: 'bg-green-100',
            },
            purple: {
                bg: 'bg-purple-50',
                text: 'text-purple-700',
                accent: 'bg-purple-500',
                gradient: 'from-purple-500 to-purple-600',
                light: 'bg-purple-100',
            },
            yellow: {
                bg: 'bg-yellow-50',
                text: 'text-yellow-700',
                accent: 'bg-yellow-500',
                gradient: 'from-yellow-500 to-yellow-600',
                light: 'bg-yellow-100',
            },
            red: {
                bg: 'bg-red-50',
                text: 'text-red-700',
                accent: 'bg-red-500',
                gradient: 'from-red-500 to-red-600',
                light: 'bg-red-100',
            },
        };
        return colors[color] || colors.blue;
    };

    const colors = getColorClasses(color);

    const renderValue = () => {
        if (loading) {
            return (
                <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-24"></div>
            );
        }

        if (typeof value === 'number') {
            return (
                <span className="text-3xl font-bold text-gray-900">
                    {animatedValue}
                    {percentage > 0 && <span className="text-2xl">%</span>}
                </span>
            );
        }

        return (
            <span className="text-3xl font-bold text-gray-900">
                {value}
                {percentage > 0 && <span className="text-2xl">%</span>}
            </span>
        );
    };

    const renderTrend = () => {
        if (!trend) return null;

        const isPositive = trend.includes('+') || trend.toLowerCase().includes('up') || trend.toLowerCase().includes('increase');
        const isNegative = trend.includes('-') || trend.toLowerCase().includes('down') || trend.toLowerCase().includes('decrease');

        return (
            <div className="flex items-center space-x-1">
                {isPositive ? (
                    <FiTrendingUp className="w-4 h-4 text-green-600" />
                ) : isNegative ? (
                    <FiTrendingDown className="w-4 h-4 text-red-600" />
                ) : null}
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600' :
                        isNegative ? 'text-red-600' :
                            'text-gray-600'
                    }`}>
                    {trend}
                </span>
            </div>
        );
    };

    return (
        <div
            className={`relative bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-${color}-200 hover:transform hover:-translate-y-1 cursor-pointer ${onClick ? 'cursor-pointer' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Top row with icon and menu */}
            <div className="flex items-start justify-between mb-4">
                {/* Icon with gradient background */}
                <div className={`p-3 rounded-xl ${colors.bg} transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                    <div className={`text-2xl ${colors.text}`}>
                        {icon}
                    </div>
                </div>

                {/* More options button */}
                <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiMoreVertical className="w-5 h-5" />
                </button>
            </div>

            {/* Stats content */}
            <div>
                {/* Value */}
                <div className="mb-2">
                    {renderValue()}
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                    {title}
                </h3>

                {/* Trend and progress */}
                <div className="flex items-center justify-between">
                    {/* Trend indicator */}
                    {renderTrend()}

                    {/* Progress ring for percentage-based stats */}
                    {percentage > 0 && (
                        <div className="relative">
                            <ProgressRing
                                percentage={percentage}
                                color={color}
                                size={40}
                                strokeWidth={4}
                                animated={isHovered}
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                                {percentage}%
                            </span>
                        </div>
                    )}

                    {/* Simple progress bar for non-percentage stats */}
                    {!percentage && trend && (
                        <div className="flex-1 max-w-24">
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-500`}
                                    style={{ width: `${Math.min(100, percentage || 75)}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Decorative corner accent */}
            <div className={`absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl`}>
                <div className={`absolute -top-8 -right-8 w-16 h-16 ${colors.accent} opacity-10 rounded-full`}></div>
            </div>

            {/* Hover effect overlay */}
            {isHovered && (
                <div className={`absolute inset-0 ${colors.light} opacity-5 rounded-xl`}></div>
            )}
        </div>
    );
}

// Mini stats card variant for compact spaces
export function MiniStatsCard({ title, value, icon, color = 'blue', trend }) {
    const colors = {
        blue: 'bg-blue-50 text-blue-700',
        green: 'bg-green-50 text-green-700',
        purple: 'bg-purple-50 text-purple-700',
        yellow: 'bg-yellow-50 text-yellow-700',
        red: 'bg-red-50 text-red-700',
    };

    return (
        <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
            <div className={`p-2 rounded-lg ${colors[color]} mr-3`}>
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex items-baseline justify-between">
                    <span className="text-lg font-bold text-gray-900">{value}</span>
                    {trend && (
                        <span className="text-xs font-medium text-gray-500">{trend}</span>
                    )}
                </div>
                <p className="text-sm text-gray-500">{title}</p>
            </div>
        </div>
    );
}
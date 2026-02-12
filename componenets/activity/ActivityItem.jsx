'use client'

import { formatDistanceToNow } from 'date-fns'

export function ActivityItem({ activity }) {
    const getActivityIcon = (type) => {
        const icons = {
            create: 'bg-blue-500',
            complete: 'bg-green-500',
            update: 'bg-yellow-500',
            delete: 'bg-red-500',
        }
        return (
            <div className={`w-2 h-2 rounded-full mr-3 ${icons[type] || 'bg-gray-500'}`}></div>
        )
    }
    const formatDate = (sqlDateTime) => {
        if (!sqlDateTime) return '';

        // Ensure the string is in ISO format
        const isoString = sqlDateTime.includes('T') ? sqlDateTime : sqlDateTime.replace(' ', 'T');

        // Parse as server time (no timezone info)
        const serverDate = new Date(isoString);

        if (isNaN(serverDate)) return '';

        // Optional: If your SQL server is in a known timezone, adjust here
        // Example: server is UTC+0, client offset automatically applied
        const clientOffsetMinutes = new Date().getTimezoneOffset(); // in minutes
        serverDate.setMinutes(serverDate.getMinutes() - clientOffsetMinutes);

        // Format for display
        return serverDate.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // 24-hour format; set true for AM/PM
        });
    };
    const clientDate = formatDate(activity.created_at);
    return (
        <div className="flex items-start">
            {getActivityIcon(activity.type)}
            <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 truncate">
                    {activity.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(clientDate, { addSuffix: true })}
                </p>
            </div>
        </div>
    )
}
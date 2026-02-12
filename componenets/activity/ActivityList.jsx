'use client'

import { ActivityItem } from './ActivityItem'

export function ActivityList({ activities, loading, error, emptyMessage = "No activities yet" }) {
    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
                        <div className="bg-gray-200 rounded w-full h-4 animate-pulse"></div>
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-sm text-red-500">
                Error loading activities
            </div>
        )
    }

    if (!activities || activities.length === 0) {
        return (
            <div className="text-sm text-gray-500">
                {emptyMessage}
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {activities.map(activity => (
                <ActivityItem
                    key={activity.id || activity.created_at}
                    activity={activity}
                />
            ))}
        </div>
    )
}
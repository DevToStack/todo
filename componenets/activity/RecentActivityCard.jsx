'use client'

import { ActivityList } from "./ActivityList"


export function RecentActivityCard({
    activities,
    loading,
    error,
    title = "Recent Activity",
    showCount = true,
    limit = 5
}) {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                {showCount && activities && !loading && !error && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {Math.min(activities.length, limit)} activities
                    </span>
                )}
            </div>
            <ActivityList
                activities={activities?.slice(0, limit)}
                loading={loading}
                error={error}
                emptyMessage="Start by creating your first todo!"
            />
        </div>
    )
}
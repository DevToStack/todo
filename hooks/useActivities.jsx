'use client'

import { useEffect, useState } from 'react'

export function useActivities(limit = 5) {
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadActivities = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await fetch(`/api/activity?limit=${limit}`)

            if (!res.ok) throw new Error('Failed to load activities')

            const data = await res.json()
            setActivities(data.activities || [])
        } catch (err) {
            setError(err.message)
            console.error('Error loading activities:', err)
        } finally {
            setLoading(false)
        }
    }

    const addActivity = (newActivity) => {
        setActivities(prev => [
            {
                ...newActivity,
                id: Date.now(), // temporary ID for client-side
                created_at: newActivity.created_at || new Date().toISOString()
            },
            ...prev.slice(0, limit - 1)
        ])
    }

    useEffect(() => {
        loadActivities()
    }, [limit])

    return {
        activities,
        loading,
        error,
        reload: loadActivities,
        addActivity
    }
}
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ActivityContext = createContext()

export function ActivityProvider({ children }) {
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Load activities from API
    const loadActivities = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/activity?limit=10')
            if (!res.ok) throw new Error('Failed to load activities')
            const data = await res.json()
            setActivities(data.activities || [])
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadActivities()
    }, [])

    // Add a new activity (real-time updates)
    const addActivity = (activity) => {
        setActivities(prev => {
            // Remove existing activity for same entity (optional)
            const filtered = prev.filter(a => !(a.entity_type === activity.entity_type && a.entity_id === activity.entity_id && a.type === activity.type))
            // Prepend the new activity and limit to 10
            return [activity, ...filtered].slice(0, 10)
        })
    }

    return (
        <ActivityContext.Provider value={{
            activities,
            loading,
            error,
            reload: loadActivities,
            addActivity
        }}>
            {children}
        </ActivityContext.Provider>
    )
}

export const useActivity = () => useContext(ActivityContext)

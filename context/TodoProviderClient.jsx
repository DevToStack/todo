'use client'

import { ActivityProvider, useActivity } from './ActivityContext'
import { TodoProvider } from './TodoContext'

export default function TodoProviderClient({ children }) {
    return (
        <ActivityProvider>
            <InnerTodoProvider>
                {children}
            </InnerTodoProvider>
        </ActivityProvider>
    )
}

// Inner component accesses ActivityContext after it's provided
function InnerTodoProvider({ children }) {
    const { addActivity } = useActivity()
    return <TodoProvider addActivity={addActivity}>{children}</TodoProvider>
}

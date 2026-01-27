'use client'

import { TodoProvider } from './TodoContext'

export default function TodoProviderClient({ children }) {
    return <TodoProvider>{children}</TodoProvider>
}

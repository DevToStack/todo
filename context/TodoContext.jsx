'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const TodoContext = createContext()

export function TodoProvider({ children, addActivity }) {
    const [todos, setTodos] = useState([])
    const [filter, setFilter] = useState('all')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Load todos
    const loadTodos = async () => {
        try {
            const res = await fetch('/api/todos')
            if (!res.ok) throw await res.json()
            const data = await res.json()
            setTodos(data)
        } catch (e) {
            setError(e.error || 'Failed to load todos')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadTodos()
    }, [])

    // Safe wrapper for addActivity
    const queueActivity = (activity) => {
        setTimeout(() => {
            if (addActivity) addActivity(activity)
        }, 0)
    }

    // Add todo
    const addTodo = async (payload) => {
        try {
            const res = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            const data = await res.json()
            if (!res.ok) throw data

            setTodos(t => [data.todo, ...t])

            // Queue activity safely
            queueActivity({
                type: 'create',
                entity_type: 'todo',
                entity_id: data.todo.id,
                message: `Created todo: "${payload.title}"`,
                created_at: new Date().toISOString()
            })

            return { success: true }
        } catch (e) {
            return { success: false, error: e.error || 'Create failed' }
        }
    }

    // Update todo
    const updateTodo = async (id, updates) => {
        try {
            const res = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            })
            const data = await res.json()
            if (!res.ok) throw data

            setTodos(t => {
                const oldTodo = t.find(todo => todo.id === id)
                const updatedTodos = t.map(todo => todo.id === id ? { ...todo, ...updates } : todo)

                // Queue activity safely
                if (oldTodo) {
                    let message = `Updated todo: "${oldTodo.title}"`

                    if (updates.status && updates.status !== oldTodo.status) {
                        message = updates.status === 'completed'
                            ? `Completed todo: "${oldTodo.title}"`
                            : `Marked todo as pending: "${oldTodo.title}"`
                    }

                    queueActivity({
                        type: updates.status ? updates.status : 'update',
                        entity_type: 'todo',
                        entity_id: id,
                        message,
                        created_at: new Date().toISOString()
                    })
                }

                return updatedTodos
            })

            return { success: true }
        } catch (e) {
            return { success: false, error: e.error || 'Update failed' }
        }
    }

    // Delete todo
    const deleteTodo = async (id) => {
        try {
            setTodos(prev => {
                const todoToDelete = prev.find(t => t.id === id)
                const newTodos = prev.filter(todo => todo.id !== id)

                if (todoToDelete) {
                    queueActivity({
                        type: 'delete',
                        entity_type: 'todo',
                        entity_id: id,
                        message: `Deleted todo: "${todoToDelete.title}"`,
                        created_at: new Date().toISOString()
                    })
                }

                return newTodos
            })

            const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' })
            const data = await res.json()
            if (!res.ok) throw data

            return { success: true }
        } catch (e) {
            return { success: false, error: e.error || 'Delete failed' }
        }
    }

    // Toggle todo
    const toggleTodo = (todo) => {
        const newStatus = todo.status === 'completed' ? 'pending' : 'completed'
        updateTodo(todo.id, {
            title: todo.title,
            description: todo.description || null,
            priority: todo.priority,
            due_date: todo.due_date,
            status: newStatus
        })
    }

    // Filtered todos
    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.status === 'completed'
        if (filter === 'pending') return todo.status === 'pending'
        if (filter.startsWith('priority-')) {
            const priority = filter.split('-')[1]
            return todo.priority === priority
        }
        if (filter.startsWith('category-')) {
            const category = filter.split('-')[1]
            return todo.category === category
        }
        return true
    })

    return (
        <TodoContext.Provider value={{
            todos: filteredTodos,
            allTodos: todos,
            addTodo,
            updateTodo,
            toggleTodo,
            deleteTodo,
            filter,
            setFilter,
            loading,
            error,
            reload: loadTodos
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => useContext(TodoContext)

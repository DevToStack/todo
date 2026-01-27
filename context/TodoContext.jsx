'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const TodoContext = createContext()

export function TodoProvider({ children }) {
    const [todos, setTodos] = useState([])
    const [filter, setFilter] = useState('all')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // ---------------- LOAD ----------------
    useEffect(() => {
        loadTodos()
    }, [])

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

    // ---------------- CREATE ----------------
    const addTodo = async (payload) => {
        try {
            const res = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const data = await res.json()
            if (!res.ok) throw data

            setTodos(t => [
                data.todo,  // <- full todo from server with created_at
                ...t
            ])
            

            return { success: true }
        } catch (e) {
            return { success: false, error: e.error || 'Create failed' }
        }
    }

    // ---------------- UPDATE ----------------
    const updateTodo = async (id, updates) => {
        try {
            const res = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            })

            const data = await res.json()
            if (!res.ok) throw data

            setTodos(t =>
                t.map(todo =>
                    todo.id === id ? { ...todo, ...updates } : todo
                )
            )

            return { success: true }
        } catch (e) {
            return { success: false, error: e.error || 'Update failed' }
        }
    }

    // ---------------- DELETE ----------------
    const deleteTodo = async (id) => {
        try {
            const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' })
            const data = await res.json()

            if (!res.ok) throw data

            setTodos(t => t.filter(todo => todo.id !== id))
            return { success: true }
        } catch (e) {
            return { success: false, error: e.error || 'Delete failed' }
        }
    }

    // ---------------- TOGGLE ----------------
    const toggleTodo = (todo) => {
        updateTodo(todo.id, {
            title: todo.title,
            description: todo.description || null,
            priority: todo.priority,
            due_date: todo.due_date,
            status: todo.status === 'completed' ? 'pending' : 'completed'
        });
    };
    

    // ---------------- FILTER ----------------
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

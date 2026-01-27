'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const router = useRouter()

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function submit(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })

        const data = await res.json()

        if (!res.ok) {
            setError(data.error || 'Registration failed')
            setLoading(false)
            return
        }

        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950">
            <form
                onSubmit={submit}
                className="bg-neutral-900 p-8 rounded-xl w-full max-w-md space-y-4"
            >
                <h1 className="text-xl font-semibold text-white">Create account</h1>

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <input
                    className="input"
                    placeholder="Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                />

                <input
                    className="input"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                />

                <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                />

                <button
                    disabled={loading}
                    className="btn-primary"
                >
                    {loading ? 'Creating...' : 'Register'}
                </button>
            </form>
        </div>
    )
}

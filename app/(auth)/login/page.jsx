'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function submit(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })

        const data = await res.json()

        if (!res.ok) {
            setError(data.error || 'Login failed')
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
                <h1 className="text-xl font-semibold text-white">Login</h1>

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={e =>
                        setForm({ ...form, email: e.target.value })
                    }
                    required
                />

                <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={form.password}
                    onChange={e =>
                        setForm({ ...form, password: e.target.value })
                    }
                    required
                />

                <button
                    disabled={loading}
                    className="btn-primary"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
            </form>
        </div>
    )
}

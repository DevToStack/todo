'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    HiMail,
    HiLockClosed,
    HiEye,
    HiEyeOff,
    HiArrowRight,
    HiShieldCheck
} from 'react-icons/hi'

export default function LoginPage() {
    const router = useRouter()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function submit(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Invalid email or password')
                setLoading(false)
                return
            }

            router.push('/dashboard')
        } catch (err) {
            setError('Something went wrong. Please try again.')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

            <form
                onSubmit={submit}
                className="relative bg-neutral-900/50 backdrop-blur-xl p-8 rounded-2xl w-full max-w-xl space-y-6 border border-neutral-800 shadow-2xl"
            >
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                    <p className="text-sm text-neutral-400">
                        Sign in to your account to continue
                    </p>
                </div>

                {/* Error message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-2">
                        <HiShieldCheck className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-red-500 text-sm flex-1">{error}</p>
                    </div>
                )}

                {/* Email input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">
                        Email Address
                    </label>
                    <div className="relative group">
                        <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            placeholder="you@example.com"
                            type="email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                            autoComplete="email"
                        />
                    </div>
                </div>

                {/* Password input with eye toggle */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-neutral-300">
                            Password
                        </label>
                        <a
                            href="/forgot-password"
                            className="text-xs text-blue-500 hover:text-blue-400 transition-colors"
                        >
                            Forgot password?
                        </a>
                    </div>
                    <div className="relative group">
                        <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg pl-10 pr-12 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors focus:outline-none"
                        >
                            {showPassword ? (
                                <HiEyeOff className="w-5 h-5" />
                            ) : (
                                <HiEye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 bg-neutral-800 border border-neutral-700 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-neutral-400">
                            Remember me
                        </label>
                    </div>
                </div>

                {/* Submit button */}
                <button
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Signing in...</span>
                        </>
                    ) : (
                        <>
                            <span>Sign in</span>
                            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>

                {/* Sign up link */}
                <p className="text-center text-sm text-neutral-400">
                    Don't have an account?{' '}
                    <a
                        href="/register"
                        className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
                    >
                        Create free account
                    </a>
                </p>

                {/* Demo credentials hint (optional) */}
                <div className="pt-2 text-center">
                    <p className="text-xs text-neutral-600">
                        Demo: demo@example.com / demo123
                    </p>
                </div>
            </form>
        </div>
    )
}
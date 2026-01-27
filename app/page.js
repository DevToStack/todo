import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { validateSession } from '@/lib/session'

export default async function HomePage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (token) {
        const session = await validateSession(token)
        if (session) redirect('/dashboard')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold">Todo Pro</h1>
                <p className="text-neutral-400">
                    High-performance task management with Next.js
                </p>

                <div className="flex gap-4 justify-center">
                    <a href="/login" className="btn-primary w-auto px-6">Login</a>
                    <a href="/register" className="border border-neutral-700 px-6 py-3 rounded">
                        Register
                    </a>
                </div>
            </div>
        </div>
    )
}

import { query } from '@/lib/db'
import bcrypt from 'bcrypt'
import { createSession } from '@/lib/session'
import { cookies } from 'next/headers'
import { logActivity } from '@/lib/activity'   // ← import it

export async function POST(req) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return Response.json(
                { error: 'Missing credentials' },
                { status: 400 }
            )
        }

        const users = await query(
            `SELECT id, password_hash, status
       FROM users
       WHERE email = ?
       LIMIT 1`,
            [email]
        )

        if (!users.length || users[0].status !== 'active') {
            return Response.json(
                { error: 'Invalid login' },
                { status: 401 }
            )
        }

        const ok = await bcrypt.compare(
            password,
            users[0].password_hash
        )

        if (!ok) {
            return Response.json(
                { error: 'Invalid login' },
                { status: 401 }
            )
        }

        const token = await createSession(users[0].id, {
            ip: req.headers.get('x-forwarded-for') || '',
            ua: req.headers.get('user-agent') || '',
            device: 'web'
        })

        // 👉 LOG SUCCESSFUL LOGIN
        logActivity({
            user_id: users[0].id,
            type: 'login',
            message: 'Logged in successfully'
        }).catch(console.error)

        const cookieStore = await cookies()

        cookieStore.set({
            name: 'session',
            value: token,
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        })

        return Response.json({ success: true })

    } catch (err) {
        console.error('LOGIN ERROR:', err)
        return Response.json(
            { error: 'Server error' },
            { status: 500 }
        )
    }
}

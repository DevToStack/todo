import { query } from '@/lib/db'
import { hashPassword, signToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { logActivity } from '@/lib/activity'

export async function POST(req) {
    const { name, email, password } = await req.json()

    const exists = await query(
        'SELECT id FROM users WHERE email=? LIMIT 1',
        [email]
    )

    if (exists.length) {
        return Response.json({ error: 'Email exists' }, { status: 409 })
    }

    const hash = await hashPassword(password)

    const result = await query(
        `INSERT INTO users (uuid, name, email, password_hash)
     VALUES (UUID(), ?, ?, ?)`,
        [name, email, hash]
    )

    // 👉 LOG ACCOUNT CREATION
    logActivity({
        user_id: result.insertId,
        type: 'account_created',
        message: 'Your account was created'
    }).catch(console.error)

    const token = signToken({ id: result.insertId, email })

    cookies().set('token', token, { httpOnly: true })

    return Response.json({ success: true })
}

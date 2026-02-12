import { query } from '@/lib/db'
import { hashToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { logActivity } from '@/lib/activity'

export async function POST(req) {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return Response.json({ success: true })

    const hash = hashToken(token)

    // deactivate session
    const result = await query(
        `UPDATE sessions SET is_active = 0 WHERE token_hash = ?`,
        [hash]
    )

    // only log if something was actually updated
    if (result.affectedRows) {
        const session = await query(
            `SELECT user_id FROM sessions WHERE token_hash = ? LIMIT 1`,
            [hash]
        )

        if (session.length) {
            logActivity({
                user_id: session[0].user_id,
                type: 'logout',
                message: 'Logged out'
            }).catch(console.error)
        }
    }

    cookieStore.delete('session')

    return Response.json({ success: true })
}

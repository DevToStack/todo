import { query } from '@/lib/db'
import { hashToken } from '@/lib/session'
import { cookies } from 'next/headers'

export async function POST(req) {
    const token = cookies().get('session')?.value
    if (!token) return Response.json({ success: true })

    const hash = hashToken(token)

    await query(
        `UPDATE sessions SET is_active=0 WHERE token_hash=?`,
        [hash]
    )

    cookies().delete('session')

    return Response.json({ success: true })
}

import crypto from 'crypto'
import { query } from './db'

export function hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex')
}

export async function createSession(userId, meta = {}) {
    const token = crypto.randomBytes(48).toString('hex')
    const hash = hashToken(token)

    await query(
        `
    INSERT INTO sessions
      (uuid, user_id, token_hash, ip_address, user_agent, device_info, expires_at)
    VALUES
      (UUID(), ?, ?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))
    `,
        [
            userId,
            hash,
            meta.ip || null,
            meta.ua || null,
            meta.device || null
        ]
    )

    return token // only time plaintext token exists
}

export async function validateSession(token) {
    if (!token) return null

    const hash = hashToken(token)

    const rows = await query(
        `
    SELECT 
      s.id AS session_id,
      s.user_id,
      u.email,
      u.name,
      u.role,
      u.status
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE 
      s.token_hash = ?
      AND s.is_active = 1
      AND s.expires_at > NOW()
      AND u.status = 'active'
    LIMIT 1
    `,
        [hash]
    )

    if (!rows.length) return null

    // optional activity tracking (recommended)
    await query(
        `UPDATE sessions SET last_activity = NOW() WHERE id = ?`,
        [rows[0].session_id]
    )

    return rows[0]   // authenticated user context
}

export async function revokeSession(token) {
    const hash = hashToken(token)

    await query(
        `UPDATE sessions SET is_active = 0 WHERE token_hash = ?`,
        [hash]
    )
}

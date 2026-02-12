import { query } from './db'

export async function logActivity({
    user_id,
    type,
    entity_type = null,
    entity_id = null,
    message
}) {
    return query(
        `
    INSERT INTO activity_logs 
      (user_id, type, entity_type, entity_id, message)
    VALUES (?, ?, ?, ?, ?)
    `,
        [
            user_id,
            type,
            entity_type,
            entity_id,
            message
        ]
    )
}
export async function getActivityLogs({ user_id, limit = 50 }) {
    limit = Number(limit)

    if (!Number.isInteger(limit) || limit <= 0) {
        limit = 50
    }

    return query(
        `
      SELECT 
        type,
        entity_type,
        entity_id,
        message,
        created_at
      FROM activity_logs
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ${limit}
      `,
        [user_id]
    )
}
  

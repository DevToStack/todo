import { query } from './db'

export function logActivity(data) {
    query(
        `INSERT INTO activity_logs
     (uuid,user_id,action,entity_type,entity_id,ip_address,user_agent,new_values)
     VALUES (UUID(),?,?,?,?,?,?,?)`,
        [
            data.user_id,
            data.action,
            data.entity_type,
            data.entity_id,
            data.ip,
            data.ua,
            JSON.stringify(data.new_values || null)
        ]
    )
}

import { pool, query } from '@/lib/db'
import { validateSession } from '@/lib/session'

async function user(req) {
    const token = req.cookies.get('session')?.value
    const session = await validateSession(token)
    return session?.user_id
}

export async function GET(req) {
    const userId = await user(req);

    // Fetch todos with their tags
    const todos = await query(
        `
        SELECT
        t.*,
        IFNULL(JSON_ARRAYAGG(JSON_OBJECT('id', tag.id, 'name', tag.name, 'color', tag.color)), JSON_ARRAY()) AS tags
        FROM todos t
        LEFT JOIN todo_tags tt ON t.id = tt.todo_id
        LEFT JOIN tags tag ON tt.tag_id = tag.id
        WHERE t.user_id = ?
        GROUP BY t.id
        ORDER BY t.position ASC, t.due_date ASC
        `,
        [userId]
    );

    return Response.json(todos);
}

export async function POST(req) {
    const userId = await user(req)
    if (!userId) {
        return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, priority, due_date, tags = [], category } = await req.json()

    if (!title?.trim()) return bad('title is required')
    if (!description?.trim()) return bad('description is required')
    if (!priority) return bad('priority is required')
    if (!due_date) return bad('due_date is required')
    if (!Array.isArray(tags)) return bad('tags must be an array')
    if (!category?.trim()) return bad('category is required')

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        const [res] = await conn.execute(
            `INSERT INTO todos
             (uuid,user_id,title,description,priority,due_date,category)
             VALUES (UUID(),?,?,?,?,?,?)`,
            [userId, title, description, priority, due_date, category]
        )

        const todoId = res.insertId

        if (tags.length) {
            const values = tags.map(t => [todoId, t])
            await conn.query(
                `INSERT INTO todo_tags (todo_id,tag_id) VALUES ?`,
                [values]
            )
        }

        // Fetch the inserted todo with tags and timestamps
        const [rows] = await conn.query(
            `
            SELECT
                t.*,
                IFNULL(JSON_ARRAYAGG(JSON_OBJECT('id', tag.id, 'name', tag.name, 'color', tag.color)), JSON_ARRAY()) AS tags
            FROM todos t
            LEFT JOIN todo_tags tt ON t.id = tt.todo_id
            LEFT JOIN tags tag ON tt.tag_id = tag.id
            WHERE t.id = ?
            GROUP BY t.id
            `,
            [todoId]
        )

        await conn.commit()

        return Response.json({ success: true, todo: rows[0] })
    } catch (e) {
        await conn.rollback()
        console.error(e)
        return Response.json({ success: false, error: 'Failed to create todo' }, { status: 500 })
    } finally {
        conn.release()
    }
}

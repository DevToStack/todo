import { query } from '@/lib/db'
import { validateSession } from '@/lib/session'

// Helper: Get user ID from session
const uid = async (req) => {
    const sessionToken = req.cookies.get('session')?.value
    const session = await validateSession(sessionToken)
    if (!session) throw new Error('UNAUTHORIZED')
    return session.user_id
}

// Convert JS date to MySQL DATETIME string
const toMySQLDateTime = (date) => {
    if (!date) return null
    const d = new Date(date)
    if (isNaN(d.getTime())) return null
    return d.toISOString().slice(0, 19).replace('T', ' ')
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params // await because Next 16+ dynamic API
        const user = await uid(req)
        const data = await req.json()

        const { title, description, status, priority, due_date } = data

        // ---- Required field validation ----
        if (!title || !status || !priority || !due_date) {
            return Response.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // ---- Enum validation ----
        const allowedStatus = ['pending', 'completed', 'cancelled']
        const allowedPriority = ['low', 'medium', 'high']

        if (!allowedStatus.includes(status)) {
            return Response.json(
                { error: 'Invalid status value' },
                { status: 400 }
            )
        }

        if (!allowedPriority.includes(priority)) {
            return Response.json(
                { error: 'Invalid priority value' },
                { status: 400 }
            )
        }

        // ---- Convert due_date to MySQL format ----
        const formattedDueDate = toMySQLDateTime(due_date)
        if (!formattedDueDate) {
            return Response.json(
                { error: 'Invalid due_date format' },
                { status: 400 }
            )
        }

        // ---- Execute update ----
        const result = await query(
            `UPDATE todos SET
                title=?,
                description=?,
                status=?,
                priority=?,
                due_date=?,
                updated_at=NOW()
             WHERE id=? AND user_id=?`,
            [
                title,
                description || null,
                status,
                priority,
                formattedDueDate,
                id,
                user
            ]
        )

        if (result.affectedRows === 0) {
            return Response.json(
                { error: 'Todo not found or not authorized' },
                { status: 404 }
            )
        }

        return Response.json({ success: true })
    } catch (err) {
        if (err.message === 'UNAUTHORIZED') {
            return Response.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        console.error(err)
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}


export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        const user = await uid(req)

        const result = await query(
            `DELETE FROM todos WHERE id=? AND user_id=?`,
            [id, user]
        )

        if (result.affectedRows === 0) {
            return Response.json(
                { error: 'Todo not found' },
                { status: 404 }
            )
        }

        return Response.json({ success: true })

    } catch (err) {
        if (err.message === 'UNAUTHORIZED') {
            return Response.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        console.error(err)

        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

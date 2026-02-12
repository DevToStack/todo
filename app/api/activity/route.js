import { getActivityLogs } from '@/lib/activity'
import { validateSession } from '@/lib/session'

async function userId(req) {
  const token = req.cookies.get('session')?.value
  const session = await validateSession(token)
  if (!session) throw new Error('UNAUTHORIZED')
  return session.user_id
}

export async function GET(req) {
  try {
    const user_id = await userId(req)

    const { searchParams } = new URL(req.url)
    const limit = Number(searchParams.get('limit')) || 20

    const activities = await getActivityLogs({ user_id, limit })

    return Response.json({
      success: true,
      activities
    })

  } catch (err) {
    if (err.message === 'UNAUTHORIZED') {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.error(err)
    return Response.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}

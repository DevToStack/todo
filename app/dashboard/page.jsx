
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/session'
import { DashboardPageUi } from '@/componenets/dashboard'

export default async function DashboardPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value


    const user = await validateSession(token)

    if (!user) redirect('/login')

    return(
        <div className='w-full'>
            <DashboardPageUi />
        </div>
    ) 
}

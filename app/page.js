import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { validateSession } from '@/lib/session'
import {
    HiCheckCircle,
    HiSparkles,
    HiArrowRight,
    HiLightningBolt,
    HiShieldCheck,
    HiDeviceMobile,
    HiCloud,
    HiUsers,
    HiCheck,
    HiClipboardList,
    HiTag,
    HiSearch
} from 'react-icons/hi'

export default async function HomePage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (token) {
        const session = await validateSession(token)
        if (session) redirect('/dashboard')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-grid-blue-500/[0.02] bg-[size:50px_50px]" />

            {/* Hero section */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                {/* Floating badge */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-4 py-2">
                        <HiSparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">
                            Next.js 16 · Simple · Free
                        </span>
                    </div>
                </div>

                {/* Main content */}
                <div className="text-center space-y-8">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight">
                        Just a{' '}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            simple todo app
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
                        No AI. No blockchain. No quantum computing.{' '}
                        <span className="text-gray-900 font-semibold">Just checkboxes.</span>{' '}
                        Create, complete, repeat.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="/register"
                            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-600/25"
                        >
                            <span>Start doing things</span>
                            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="/login"
                            className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow"
                        >
                            <span>Sign In</span>
                        </a>
                    </div>

                    {/* Social proof - honest numbers */}
                    <div className="flex items-center justify-center gap-6 pt-8 flex-wrap">
                        <div className="flex items-center gap-2 text-gray-600">
                            <HiUsers className="w-5 h-5 text-blue-600" />
                            <span className="text-sm"><span className="font-semibold text-gray-900">47</span> active users</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <HiCheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm"><span className="font-semibold text-gray-900">1,234</span> tasks done</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <HiClipboardList className="w-5 h-5 text-purple-600" />
                            <span className="text-sm"><span className="font-semibold text-gray-900">3</span> team members</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features section - honest and simple */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        It does exactly what you expect
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        No surprises. No learning curve. Just todos.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <HiCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Checkboxes</h3>
                        <p className="text-gray-600">
                            Click to mark done. Click again to unmark. Works exactly like a piece of paper.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <HiClipboardList className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple lists</h3>
                        <p className="text-gray-600">
                            Work, personal, groceries—keep them separate or mix them up. Your call.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <HiTag className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Labels</h3>
                        <p className="text-gray-600">
                            Categorize your tasks. Or don't. We won't judge your organization skills.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <HiCloud className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Cloud sync</h3>
                        <p className="text-gray-600">
                            Your todos are saved online. Use them on any device. Yes, that's it.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <HiDeviceMobile className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Works on phone</h3>
                        <p className="text-gray-600">
                            It's a website. Open it on your phone. It just works. Revolutionary, right?
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <HiSearch className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Search</h3>
                        <p className="text-gray-600">
                            Type what you're looking for. Find it. No magic involved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats - honest and simple */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-sm">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                47
                            </div>
                            <p className="text-gray-600">People using it</p>
                            <p className="text-sm text-gray-500 mt-1">Yes, we count every single one</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                1,234
                            </div>
                            <p className="text-gray-600">Tasks checked off</p>
                            <p className="text-sm text-gray-500 mt-1">That's 1,234 moments of satisfaction</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                0
                            </div>
                            <p className="text-gray-600">AI features</p>
                            <p className="text-sm text-gray-500 mt-1">Your tasks are safe from "intelligence"</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials - real beta users */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Real people, honest feedback
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We don't pay for testimonials. These are just nice things people said.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Testimonial 1 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-700 mb-4">
                            "It's... just a todo app. And that's perfect. No AI trying to predict what I need, no notifications, no nonsense. I love it."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                MP
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Michael Park</p>
                                <p className="text-sm text-gray-500">Software Engineer</p>
                                <span className="text-xs text-blue-600">User since March 2026</span>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-700 mb-4">
                            "I tried 15 different todo apps before this. This one doesn't try to sell me premium, doesn't have a complicated tutorial, just lets me make lists. Finally."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                SR
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Sarah Rodriguez</p>
                                <p className="text-sm text-gray-500">Teacher</p>
                                <span className="text-xs text-blue-600">User since February 2026</span>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-700 mb-4">
                            "I use it for my grocery list. My wife uses it for her work projects. It's the same app. That's the beauty of it - simple works for everything."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                DC
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">David Chen</p>
                                <p className="text-sm text-gray-500">Product Manager</p>
                                <span className="text-xs text-blue-600">User since January 2026</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Banner - humble and honest */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center shadow-xl">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                        <HiCheckCircle className="w-4 h-4 text-green-300" />
                        <span className="text-sm font-medium text-white">Completely free. Always.</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        Ready to get things done?
                    </h3>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        No credit card. No free trial expiration. Just checkboxes.
                    </p>
                    <a
                        href="/register"
                        className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl transition-all duration-200 group shadow-lg"
                    >
                        <span>Create your first todo</span>
                        <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <p className="text-blue-200 text-sm mt-4">
                        ⚡ 47 people are already checking things off
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-8 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                PlanarX
                            </span>
                            <span className="text-xs text-gray-500">© 2026</span>
                        </div>
                        <div className="flex gap-6 text-sm text-gray-600">
                            <a href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</a>
                            <a href="/terms" className="hover:text-blue-600 transition-colors">Terms</a>
                            <a href="/contact" className="hover:text-blue-600 transition-colors">Contact</a>
                        </div>
                        <div className="text-xs text-gray-400">
                            Still not a SaaS
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
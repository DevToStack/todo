import { FiBell, FiMenu, FiSearch, FiUser } from 'react-icons/fi';
import UserAvatar from '../UI/avetar';

export default function Header({ onMenuClick }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <img
                                src="/logo1.png"
                                alt="Logo"
                                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain"
                            />
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                            Vertex
                        </h1>
                    </div>

                    {/* Search Bar (Optional - commented out) */}
                    {/* <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
                        <div className="relative w-full">
                            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div> */}

                    {/* Right Section */}
                    <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
                        {/* Notification Bell */}
                        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <FiBell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        {/* Search Icon for Mobile (if you remove the search bar) */}
                        {/* <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <FiSearch className="w-5 h-5 text-gray-600" />
                        </button> */}
                        <UserAvatar name="Mohammed Rabi" />
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden p-2 rounded hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                        >
                            <FiMenu size={22} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
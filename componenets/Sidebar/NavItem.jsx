'use client';

export default function NavItem({ icon, label, count, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${active
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
        >
            <div className="flex items-center space-x-3">
                <span className={`text-lg ${active ? 'text-blue-600' : 'text-gray-400'}`}>
                    {icon}
                </span>
                <span className="font-medium">{label}</span>
            </div>
            {count !== undefined && count > 0 && (
                <span className={`text-xs px-2 py-1 rounded ${active
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                    {count}
                </span>
            )}
        </button>
    );
}
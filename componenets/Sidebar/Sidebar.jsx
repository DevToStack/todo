'use client';

import NavItem from './NavItem';
import {
    FiGrid,
    FiCheckSquare,
    FiClock,
    FiFlag,
    FiFolder,
    FiSettings,
    FiHelpCircle
} from 'react-icons/fi';
import { useTodo } from '../../context/TodoContext'; // Adjust import path as needed

export default function Sidebar({ isOpen, onClose }) {
    const { allTodos,todos, setFilter } = useTodo();

    // Calculate counts based on real todo data
    const counts = {
        all: allTodos?.length || 0,
        today: allTodos?.filter(todo => {
            if (!todo.due_date) return false;
            const today = new Date().toISOString().split('T')[0];
            return todo.due_date === today && todo.status !== 'completed';
        }).length || 0,
        priority: allTodos?.filter(todo =>
            todo.priority === 'high' && todo.status !== 'completed'
        ).length || 0,
        pending: allTodos?.filter(todo =>
            todo.status === 'pending'
        ).length || 0
    };

    // Count todos by category/tags
    const countByCategory = (category) => {
        return allTodos?.filter(todo =>
            todo.tags?.includes(category) || todo.category === category
        ).length || 0;
    };

    // Navigation items with real counts
    const navItems = [
        {
            icon: <FiGrid />,
            label: 'Dashboard',
            active: true,
            onClick: () => setFilter('all')
        },
        {
            icon: <FiCheckSquare />,
            label: 'All Tasks',
            count: counts.all,
            onClick: () => setFilter('all')
        },
        {
            icon: <FiClock />,
            label: 'Today',
            count: counts.today,
            onClick: () => {
                // You could add a custom filter for today's tasks
                // or use the existing filter system
            }
        },
        {
            icon: <FiFlag />,
            label: 'Priority',
            count: counts.priority,
            onClick: () => setFilter('high')
        },
        {
            icon: <FiFolder />,
            label: 'Pending',
            count: counts.pending,
            onClick: () => setFilter('pending')
        },
        { icon: <FiSettings />, label: 'Settings' },
        { icon: <FiHelpCircle />, label: 'Help' },
    ];

    const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Learning'];

    return (
        <aside
            className={`
                fixed lg:sticky top-0 max-sm:z-50
                right-0 lg:left-0
                h-screen overflow-y-auto w-64 bg-white border-r
                p-4
                transition-transform duration-300 ease-in-out

                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                lg:translate-x-0
            `}
        >

            <div className="mb-4 mt-16 max-sm:mt-0">

                <h2 className="text-lg font-semibold text-gray-900 mb-4">Menu</h2>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.label}
                            {...item}
                        />
                    ))}
                </nav>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">+ Add</button>
                </div>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-lg hover:text-gray-900"
                            onClick={() => {
                                // Filter by category
                                console.log(`Filter by ${category}`);
                            }}
                        >
                            <span>{category}</span>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                {countByCategory(category)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}
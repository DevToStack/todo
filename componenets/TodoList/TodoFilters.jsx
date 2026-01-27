'use client';

import { useState, useEffect } from 'react';
import { useTodo } from '../../context/TodoContext';
import { FiFilter, FiCalendar, FiChevronDown, FiX } from 'react-icons/fi';

export default function TodoFilters() {
    const { allTodos, filter, setFilter } = useTodo();
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [showPriorityMenu, setShowPriorityMenu] = useState(false);
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    // Extract unique categories from todos
    useEffect(() => {
        if (allTodos && allTodos.length > 0) {
            const uniqueCategories = [...new Set(allTodos
                .map(todo => todo.category)
                .filter(Boolean)
            )];
            setCategories(uniqueCategories);
        }
    }, [allTodos]);

    const statusFilters = [
        { id: 'all', label: 'All Tasks' },
        { id: 'pending', label: 'Pending' },
        { id: 'completed', label: 'Completed' },
    ];

    const priorityOptions = [
        { id: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
        { id: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
        { id: 'high', label: 'High', color: 'bg-red-100 text-red-800' },
        { id: 'urgent', label: 'Urgent', color: 'bg-purple-100 text-purple-800' },
        { id: 'none', label: 'No Priority', color: 'bg-gray-100 text-gray-800' },
    ];

    const sortOptions = [
        { id: 'newest', label: 'Newest First' },
        { id: 'oldest', label: 'Oldest First' },
        { id: 'priority', label: 'Priority (High to Low)' },
        { id: 'title-asc', label: 'Title (A-Z)' },
        { id: 'title-desc', label: 'Title (Z-A)' },
        { id: 'due-date', label: 'Due Date' },
    ];

    // Handle status filter change
    const handleStatusFilter = (status) => {
        setFilter(status);
        // Clear other filters when status is selected
        setSelectedPriority(null);
        setSelectedCategory(null);
    };

    // Handle priority filter change
    const handlePriorityFilter = (priority) => {
        setSelectedPriority(priority);
        setFilter(`priority-${priority}`);
        // Clear other filters when priority is selected
        setSelectedCategory(null);
    };

    // Handle category filter change
    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        setFilter(`category-${category}`);
        // Clear other filters when category is selected
        setSelectedPriority(null);
    };

    // Clear all filters
    const clearFilters = () => {
        setFilter('all');
        setSelectedPriority(null);
        setSelectedCategory(null);
        setSortBy('newest');
    };

    return (
        <div className="space-y-4">
            {/* Main filter bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Left side: Status filters */}
                <div className="flex flex-wrap items-center gap-2">
                    <FiFilter className="text-gray-400 w-4 h-4" />
                    {statusFilters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => handleStatusFilter(f.id)}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${filter === f.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Right side: Sort dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowSortMenu(!showSortMenu)}
                        className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <FiCalendar className="w-4 h-4" />
                        <span>Sort: {sortOptions.find(s => s.id === sortBy)?.label}</span>
                        <FiChevronDown className="w-4 h-4" />
                    </button>

                    {showSortMenu && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        setSortBy(option.id);
                                        setShowSortMenu(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortBy === option.id ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Additional filters bar */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Priority filter dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowPriorityMenu(!showPriorityMenu);
                            setShowCategoryMenu(false);
                        }}
                        className={`flex items-center space-x-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${selectedPriority
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <span>Priority: {selectedPriority ? priorityOptions.find(p => p.id === selectedPriority)?.label : 'All'}</span>
                        <FiChevronDown className="w-4 h-4" />
                    </button>

                    {showPriorityMenu && (
                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                            <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Filter by Priority
                            </div>
                            {priorityOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        handlePriorityFilter(option.id);
                                        setShowPriorityMenu(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${selectedPriority === option.id ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                                        }`}
                                >
                                    <div className={`w-3 h-3 rounded-full ${option.color.split(' ')[0]}`}></div>
                                    {option.label}
                                </button>
                            ))}
                            {selectedPriority && (
                                <button
                                    onClick={() => {
                                        setSelectedPriority(null);
                                        setFilter('all');
                                        setShowPriorityMenu(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-200 mt-2 pt-2"
                                >
                                    Clear Priority Filter
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Category filter dropdown */}
                {categories.length > 0 && (
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowCategoryMenu(!showCategoryMenu);
                                setShowPriorityMenu(false);
                            }}
                            className={`flex items-center space-x-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${selectedCategory
                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <span>Category: {selectedCategory || 'All'}</span>
                            <FiChevronDown className="w-4 h-4" />
                        </button>

                        {showCategoryMenu && (
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                                <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Filter by Category
                                </div>
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            handleCategoryFilter(category);
                                            setShowCategoryMenu(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${selectedCategory === category ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                                {selectedCategory && (
                                    <button
                                        onClick={() => {
                                            setSelectedCategory(null);
                                            setFilter('all');
                                            setShowCategoryMenu(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-200 mt-2 pt-2"
                                    >
                                        Clear Category Filter
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Clear all filters button */}
                {(selectedPriority || selectedCategory || filter !== 'all') && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <FiX className="w-4 h-4" />
                        <span>Clear All</span>
                    </button>
                )}

                {/* Active filters display */}
                {(selectedPriority || selectedCategory) && (
                    <div className="flex items-center gap-2 ml-auto">
                        <span className="text-sm text-gray-500">Active filters:</span>
                        {selectedPriority && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 flex items-center gap-1">
                                Priority: {priorityOptions.find(p => p.id === selectedPriority)?.label}
                                <button
                                    onClick={() => {
                                        setSelectedPriority(null);
                                        setFilter('all');
                                    }}
                                    className="hover:text-blue-900"
                                >
                                    <FiX className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {selectedCategory && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 flex items-center gap-1">
                                Category: {selectedCategory}
                                <button
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setFilter('all');
                                    }}
                                    className="hover:text-green-900"
                                >
                                    <FiX className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
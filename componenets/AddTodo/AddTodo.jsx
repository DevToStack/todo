'use client';

import { useState } from 'react';
import { useTodo } from '../../context/TodoContext';
import { FiPlus, FiFlag, FiTag, FiFilter, FiX } from 'react-icons/fi';
import { MdSort } from 'react-icons/md';
import TodoFilters from '../TodoList/TodoFilters';

export default function TodoHeader() {
    const { addTodo } = useTodo();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [category, setCategory] = useState('General');
    const [dueDate, setDueDate] = useState('')
    const [formError, setFormError] = useState(null)
    const [submitting, setSubmitting] = useState(false)


    // Filter and sort states
    const [filterPriority, setFilterPriority] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [showFilters, setShowFilters] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        setSubmitting(true)

        const res = await addTodo({
            title: title.trim(),
            description: description.trim(),
            priority,
            due_date: dueDate,
            category,
            tags: []
        })

        setSubmitting(false)

        if (!res.success) {
            setFormError(res.error)
            return
        }

        // reset on success
        setTitle('')
        setDescription('')
        setPriority('medium')
        setDueDate('')
        setCategory('General')
        setIsModalOpen(false)
    }
    

    const categories = ['General', 'Work', 'Personal', 'Shopping', 'Health', 'Learning'];
    const priorities = ['low', 'medium', 'high'];

    // Reset filters
    const resetFilters = () => {
        setFilterPriority('all');
        setFilterCategory('all');
        setSortBy('date');
    };

    return (
        <div className="mb-2">
            {/* Header with Add Task button and Filters/Sort */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 min-w-[150px] max-sm:min-w-[70px]">
                {/* Add Task Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-md"
                >
                    <FiPlus className="w-5 h-5 mr-2" />
                    <span className='max-sm:hidden'>Add Task</span>
                </button>

            </div>

            {/* Filters and Sort Panel */}
            {showFilters && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-slide-down">
                    <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                        <FiFilter className="w-4 h-4 mr-2" />
                        Filters & Sort
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Priority Filter */}
                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <FiFlag className="w-4 h-4 mr-2" />
                                Filter by Priority
                            </label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setFilterPriority('all')}
                                    className={`px-3 py-2 text-sm rounded-lg ${filterPriority === 'all'
                                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
                                >
                                    All
                                </button>
                                {priorities.map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setFilterPriority(p)}
                                        className={`px-3 py-2 text-sm rounded-lg capitalize ${filterPriority === p
                                            ? p === 'high'
                                                ? 'bg-red-100 text-red-700 border border-red-300'
                                                : p === 'medium'
                                                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                                                    : 'bg-green-100 text-green-700 border border-green-300'
                                            : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <FiTag className="w-4 h-4 mr-2" />
                                Filter by Category
                            </label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort Options */}
                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <MdSort className="w-4 h-4 mr-2" />
                                Sort by
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="date">Date Added (Newest)</option>
                                <option value="date-oldest">Date Added (Oldest)</option>
                                <option value="priority">Priority (High to Low)</option>
                                <option value="priority-low">Priority (Low to High)</option>
                                <option value="title">Title (A-Z)</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Task Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 animate-fade-in">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Add New Task</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <FiX className="w-6 h-6" />
                                </button>
                            </div>
                            {formError && (
                                <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                                    {formError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className=' text-black'>
                                {/* Title */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter task title..."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        autoFocus
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter task description..."
                                        rows="3"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {/* Priority */}
                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <FiFlag className="w-4 h-4 mr-2" />
                                            Priority
                                        </label>
                                        <div className="flex space-x-2">
                                            {priorities.map((p) => (
                                                <button
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setPriority(p)}
                                                    className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${priority === p
                                                        ? p === 'high'
                                                            ? 'bg-red-100 text-red-700 border border-red-300'
                                                            : p === 'medium'
                                                                ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                                                                : 'bg-green-100 text-green-700 border border-green-300'
                                                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <FiTag className="w-4 h-4 mr-2" />
                                            Category
                                        </label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Due Date *
                                    </label>
                                    <input
                                        type="date"
                                        value={dueDate}
                                        onChange={e => setDueDate(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Modal Actions */}
                                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting || !title.trim()}
                                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
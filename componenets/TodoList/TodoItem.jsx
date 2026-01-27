'use client';

import { useState } from 'react';
import { useTodo } from '../../context/TodoContext';
import {
    FiTrash2,
    FiEdit2,
    FiFlag,
    FiClock,
    FiTag,
    FiChevronDown,
    FiChevronUp,
    FiX,
    FiCheck
} from 'react-icons/fi';

export default function TodoItem({ todo }) {
    const { toggleTodo, deleteTodo, updateTodo } = useTodo();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editPriority, setEditPriority] = useState(todo.priority);
    const [formError, setFormError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [editDescription, setEditDescription] = useState(todo.description || '');
    const [editCategory, setEditCategory] = useState(todo.category || 'General');
    const [editDueDate, setEditDueDate] = useState(
        todo.due_date ? todo.due_date.split('T')[0] : ''
    );

    const formatMobileDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };
    const priorities = ['low', 'medium', 'high'];
    const categories = ['General', 'Work', 'Personal', 'Shopping', 'Others'];
    const handleSave = async (e) => {
        e.preventDefault();
        setFormError(null);
        setSubmitting(true);

        if (!editTitle.trim()) {
            setFormError('Title is required');
            setSubmitting(false);
            return;
        }

        const res = await updateTodo(todo.id, {
            title: editTitle,
            description: editDescription,
            priority: editPriority,
            category: editCategory,
            due_date: editDueDate,
            status: todo.status
        });

        setSubmitting(false);

        if (!res.success) {
            setFormError(res.error);
            return;
        }

        setIsEditing(false);
    };
    

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high': return <FiFlag className="w-4 h-4 text-red-600" />;
            case 'medium': return <FiFlag className="w-4 h-4 text-yellow-600" />;
            case 'low': return <FiFlag className="w-4 h-4 text-green-600" />;
            default: return <FiFlag className="w-4 h-4 text-gray-600" />;
        }
    };

    const formatDate = (sqlDateTime) => {
        if (!sqlDateTime) return '';

        // Ensure the string is in ISO format
        const isoString = sqlDateTime.includes('T') ? sqlDateTime : sqlDateTime.replace(' ', 'T');

        // Parse as server time (no timezone info)
        const serverDate = new Date(isoString);

        if (isNaN(serverDate)) return '';

        // Optional: If your SQL server is in a known timezone, adjust here
        // Example: server is UTC+0, client offset automatically applied
        const clientOffsetMinutes = new Date().getTimezoneOffset(); // in minutes
        serverDate.setMinutes(serverDate.getMinutes() - clientOffsetMinutes);

        // Format for display
        return serverDate.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // 24-hour format; set true for AM/PM
        });
    };

    return (
        <div className="group rounded-lg hover:border-gray-300">
            <div className="bg-white rounded-lg border-2 border-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="p-3 sm:p-4">
                    {/* Mobile optimized layout */}
                    <div className="flex items-start justify-between">
                        {/* Left side: Checkbox and content - Stack on mobile */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 sm:gap-3">
                                {/* Checkbox - larger touch target on mobile */}
                                <button
                                    onClick={() => toggleTodo(todo)}
                                    className={`flex-shrink-0 w-7 h-7 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 active:scale-95 ${todo.status === 'completed'
                                        ? 'bg-green-500 border-green-500'
                                        : 'border-gray-300 hover:border-green-500'
                                        }`}
                                    aria-label={todo.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
                                >
                                    {todo.status === 'completed' && <FiCheck className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-white" />}
                                </button>

                                {/* Content - full width on mobile */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                        <div className="flex-1">
                                            <h3 className={`text-sm sm:text-base font-medium break-words ${todo.status === 'completed'
                                                ? 'text-gray-500 line-through'
                                                : 'text-gray-900'
                                                }`}>
                                                {todo.title}
                                            </h3>

                                            {/* Mobile compact meta info */}
                                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2">
                                                {/* Priority badge - smaller on mobile */}
                                                <span className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(todo.priority)}`}>
                                                    <span className="sm:hidden">
                                                        {getPriorityIcon(todo.priority)}
                                                    </span>
                                                    <span className="hidden sm:inline mr-1">
                                                        {getPriorityIcon(todo.priority)}
                                                    </span>
                                                    <span className="text-xs capitalize">{todo.priority}</span>
                                                </span>

                                                {/* Category badge - hide text on very small screens */}
                                                {todo.category && (
                                                    <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                                        <FiTag className="w-3 h-3 mr-1 hidden sm:block" />
                                                        <span className="truncate max-w-[80px] sm:max-w-none">
                                                            {todo.category}
                                                        </span>
                                                    </span>
                                                )}

                                                {/* Date - icon only on mobile */}
                                                <span className="inline-flex items-center text-xs text-gray-500">
                                                    <FiClock className="w-3 h-3 mr-1" />
                                                    <span className="hidden sm:inline">
                                                        {formatDate(todo.created_at)}
                                                    </span>
                                                    <span className="sm:hidden text-xs">
                                                        {formatMobileDate(todo.created_at)}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Mobile actions - always visible on mobile */}
                                        <div className="flex items-center justify-between sm:justify-end gap-1 sm:ml-4">
                                            {/* Mobile status indicator */}
                                            <div className="sm:hidden">
                                                <div className={`w-2 h-2 rounded-full ${todo.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                            </div>

                                            {/* Edit button - always visible on mobile */}
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors active:scale-95 sm:opacity-0 sm:group-hover:opacity-100"
                                                title="Edit task"
                                                aria-label="Edit task"
                                            >
                                                <FiEdit2 className="w-4 h-4" />
                                            </button>

                                            {/* Delete button - always visible on mobile */}
                                            <button
                                                onClick={() => deleteTodo(todo.id)}
                                                className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors active:scale-95"
                                                title="Delete task"
                                                aria-label="Delete task"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>

                                            {/* Expand button */}
                                            <button
                                                onClick={() => setIsExpanded(!isExpanded)}
                                                className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
                                                aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                                            >
                                                {isExpanded ? (
                                                    <FiChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <FiChevronDown className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress bar for subtasks - mobile optimized */}
                    {todo.subtasks && todo.subtasks.length > 0 && (
                        <div className="mt-3 px-1 sm:px-0">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                <span className="text-xs">Progress</span>
                                <span className="text-xs font-medium">
                                    {todo.subtasks.filter(st => st.status === 'completed').length}/{todo.subtasks.length}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${(todo.subtasks.filter(st => st.status === 'completed').length / todo.subtasks.length) * 100}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Expanded Details - mobile optimized */}
                    {isExpanded && !isEditing && (
                        <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-up">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Status Info */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between sm:block">
                                        <h4 className="text-xs font-medium text-gray-500 uppercase">Status</h4>
                                        <div className="flex items-center sm:mt-2">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${todo.status === 'completed'
                                                ? 'bg-green-100 text-green-800 border border-green-200'
                                                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                                }`}>
                                                <div className={`w-2 h-2 rounded-full mr-1.5 ${todo.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                                                    }`}></div>
                                                <span className="capitalize">
                                                    {todo.status === 'completed' ? 'Completed' : 'Pending'}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Created: {formatDate(todo.created_at)}
                                    </p>
                                </div>

                                {/* Actions - stacked on mobile */}
                                <div>
                                    <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Quick Actions</h4>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <button
                                            onClick={() => toggleTodo(todo)}
                                            className="px-3 py-2 sm:py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors active:scale-95 flex-1"
                                        >
                                            {todo.status === 'completed' ? 'Mark as Pending' : 'Mark Complete'}
                                        </button>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            className="px-3 py-2 sm:py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors active:scale-95 flex-1"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Notes section */}
                            {todo.notes && (
                                <div className="mt-4">
                                    <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Notes</h4>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg break-words">
                                        {todo.notes}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal - Mobile optimized */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 animate-fade-in">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto m-2">
                        <div className="p-4 sm:p-6">
                            {/* Sticky header on mobile */}
                            <div className="sticky top-0 bg-white pb-4 border-b border-gray-200 mb-4 sm:static sm:pb-0 sm:border-b-0">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Edit Task</h2>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="p-1 text-gray-400 hover:text-gray-600 active:scale-95"
                                        aria-label="Close"
                                    >
                                        <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                </div>
                            </div>

                            {formError && (
                                <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                                    {formError}
                                </div>
                            )}

                            <form onSubmit={handleSave} className='text-black space-y-4'>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={e => setEditTitle(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={editDescription}
                                        onChange={e => setEditDescription(e.target.value)}
                                        rows="3"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-base"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Priority
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {priorities.map(p => (
                                                <button
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setEditPriority(p)}
                                                    className={`py-2.5 text-sm font-medium rounded-lg capitalize transition-colors active:scale-95 ${editPriority === p ? getPriorityColor(p) : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category
                                        </label>
                                        <select
                                            value={editCategory}
                                            onChange={e => setEditCategory(e.target.value)}
                                            className="w-full px-3 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                                    <input
                                        type="date"
                                        value={editDueDate}
                                        onChange={e => setEditDueDate(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                        required
                                    />
                                </div>

                                {/* Sticky buttons on mobile */}
                                <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200 mt-6 sm:static sm:pt-4">
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors active:scale-95"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={submitting || !editTitle.trim()}
                                            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                                        >
                                            {submitting ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
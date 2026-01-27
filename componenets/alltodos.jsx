'use client';

import { useState, useMemo } from 'react';
import { TodoProvider, useTodo } from '../context/TodoContext';
import TodoList from './TodoList/TodoList';
import AddTodo from './AddTodo/AddTodo';
import Card from './UI/Card';

import {
    FiSearch,
    FiFilter,
    FiCheckCircle,
    FiClock,
    FiTrash2,
    FiCheckSquare,
    FiSquare,
    FiArrowUp,
    FiArrowDown,
    FiList
} from 'react-icons/fi';
import TodoFilters from './TodoList/TodoFilters';

function TodosContent() {
    const {
        todos,
        updateTodo,
        deleteTodo,
        bulkDeleteTodos,
        bulkUpdateStatus
    } = useTodo();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedTodos, setSelectedTodos] = useState([]);
    const [isSelectMode, setIsSelectMode] = useState(false);

    const filteredAndSortedTodos = useMemo(() => {
        const filtered = todos.filter(todo => {
            const titleMatch = todo.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const descMatch = todo.description
                ? todo.description.toLowerCase().includes(searchTerm.toLowerCase())
                : false;

            const matchesSearch = titleMatch || descMatch;
            const matchesStatus =
                filterStatus === 'all' || todo.status === filterStatus;

            return matchesSearch && matchesStatus;
        });

        filtered.sort((a, b) => {
            let aValue;
            let bValue;

            if (sortBy === 'createdAt') {
                aValue = new Date(a.createdAt).getTime();
                bValue = new Date(b.createdAt).getTime();
            }

            if (sortBy === 'title') {
                aValue = a.title.toLowerCase();
                bValue = b.title.toLowerCase();
            }

            if (sortBy === 'priority') {
                const order = { high: 3, medium: 2, low: 1 };
                aValue = order[a.priority || 'low'];
                bValue = order[b.priority || 'low'];
            }

            if (aValue === bValue) return 0;

            return sortOrder === 'asc'
                ? aValue > bValue ? 1 : -1
                : aValue < bValue ? 1 : -1;
        });

        return filtered;
    }, [todos, searchTerm, filterStatus, sortBy, sortOrder]);

    const stats = useMemo(() => {
        const total = todos.length;
        const completed = todos.filter(t => t.status === 'completed').length;

        return {
            total,
            completed,
            pending: total - completed,
            completionRate: total ? Math.round((completed / total) * 100) : 0
        };
    }, [todos]);

    const toggleSelectTodo = id => {
        setSelectedTodos(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedTodos.length === filteredAndSortedTodos.length) {
            setSelectedTodos([]);
        } else {
            setSelectedTodos(filteredAndSortedTodos.map(t => t.id));
        }
    };

    const handleBulkComplete = () => {
        bulkUpdateStatus(selectedTodos, 'completed');
        setSelectedTodos([]);
        setIsSelectMode(false);
    };

    const handleBulkDelete = () => {
        if (!selectedTodos.length) return;
        if (!confirm(`Delete ${selectedTodos.length} todos?`)) return;

        bulkDeleteTodos(selectedTodos);
        setSelectedTodos([]);
        setIsSelectMode(false);
    };

    const toggleSort = field => {
        if (sortBy === field) {
            setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    return (
        <div className="p-6 lg:p-8">

            {/* Header */}
            <div className="flex flex-wrap justify-between gap-4 mb-4 mt-15 items-center">

                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold text-gray-900">All Tasks</h2>
                    <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {todos.length} tasks
                    </div>
                </div>
                {isSelectMode ? (
                    <div className="flex gap-2">
                        <button onClick={handleBulkComplete} className="btn-green">
                            <FiCheckCircle /> Complete
                        </button>
                        <button onClick={handleBulkDelete} className="btn-red">
                            <FiTrash2 /> Delete
                        </button>
                        <button
                            onClick={() => {
                                setIsSelectMode(false);
                                setSelectedTodos([]);
                            }}
                            className="btn-gray"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setIsSelectMode(true)} className="btn-blue">
                        <FiCheckSquare /> Bulk
                    </button>
                )}
            </div>

            <div className="relative w-full mb-2">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-12 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-black"
                />
            </div>

            <div className='w-full flex justify-end items-center'>
                <AddTodo />
            </div>

            {/* Todo List Section - 2/3 width */}
            <div className="lg:col-span-2">
                <Card className="h-full">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {todos.length} tasks
                        </span>
                    </div>
                    <TodoFilters />
                    <TodoList />
                </Card>
            </div>
        </div>
    );
}

export default function TodosPage() {
    return (
        <TodoProvider>
            <TodosContent />
        </TodoProvider>
    );
}

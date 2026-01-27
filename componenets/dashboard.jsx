'use client';

import { useState, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import StatsCard from './Stats/StatsCard';
import AddTodo from './AddTodo/AddTodo';
import Card from './UI/Card';
import { FiCheckCircle, FiClock, FiList, FiTrendingUp } from 'react-icons/fi';
import TodoList from './TodoList/TodoList';

// Remove TodoProvider wrapper - just use the context
export function DashboardPageUi() {
    const { todos } = useTodo();
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        pending: 0,
        completionRate: 0
    });

    useEffect(() => {
        const total = todos.length;
        const completed = todos.filter(todo => todo.status === 'completed').length;
        const pending = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        setStats({ total, completed, pending, completionRate });
    }, [todos]);

    return (
        <div className="flex flex-col p-6 max-sm:p-4 lg:p-8">
            {/* Welcome Section */}
            <div className="mb-8 mt-16">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage your tasks efficiently</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Tasks"
                    value={stats.total}
                    icon={<FiList className="w-6 h-6" />}
                    color="blue"
                    trend={`${stats.completed} completed`}
                />
                <StatsCard
                    title="Completed"
                    value={stats.completed}
                    icon={<FiCheckCircle className="w-6 h-6" />}
                    color="green"
                    trend={`${stats.completionRate}% rate`}
                />
                <StatsCard
                    title="Pending"
                    value={stats.pending}
                    icon={<FiClock className="w-6 h-6" />}
                    color="yellow"
                    trend="Need attention"
                />
                <StatsCard
                    title="Productivity"
                    value={`${stats.completionRate}%`}
                    icon={<FiTrendingUp className="w-6 h-6" />}
                    color="purple"
                    trend="This week"
                />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Todo List Section - 2/3 width */}
                <div className="lg:col-span-2">
                    <Card className="h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {todos.length} tasks
                            </span>
                        </div>
                        <AddTodo />
                        <TodoList />
                    </Card>
                </div>

                {/* Quick Stats & Info Section - 1/3 width */}
                <div className="space-y-6">
                    {/* Progress Card */}
                    <Card>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Overview</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Completion Rate</span>
                                    <span className="font-medium">{stats.completionRate}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${stats.completionRate}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600">Completed</span>
                                    <span className="font-medium text-green-600">{stats.completed}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Pending</span>
                                    <span className="font-medium text-yellow-600">{stats.pending}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Tips Card */}
                    <Card>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Productivity Tips</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                <span className="text-sm text-gray-600">Break large tasks into smaller steps</span>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                                <span className="text-sm text-gray-600">Prioritize with deadlines</span>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                                <span className="text-sm text-gray-600">Review completed tasks weekly</span>
                            </li>
                        </ul>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {todos
                                .filter(todo => todo.completed)
                                .slice(0, 3)
                                .map(todo => (
                                    <div key={todo.id} className="flex items-center text-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                        <span className="text-gray-600 truncate">Completed: {todo.title}</span>
                                    </div>
                                ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
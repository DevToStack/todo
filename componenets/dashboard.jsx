'use client';

import { useState, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import StatsCard from './Stats/StatsCard';
import AddTodo from './AddTodo/AddTodo';
import Card from './UI/Card';
import { FiCheckCircle, FiClock, FiList, FiTrendingUp } from 'react-icons/fi';
import TodoList from './TodoList/TodoList';
import { useActivities } from '@/hooks/useActivities';
import { RecentActivityCard } from './activity/RecentActivityCard';

// Remove TodoProvider wrapper - just use the context
export function DashboardPageUi() {
    const { todos } = useTodo();
    const { activities, loading, error } = useActivities(5)
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
                    {/* Recent Activity */}
                    <RecentActivityCard 
                        activities={activities}
                        loading={loading}
                        error={error}
                        title="Recent Activity"
                        showCount={true}
                        limit={10}
                    />
                </div>
            </div>
        </div>
    );
}
'use client';

import TodoItem from './TodoItem';
import TodoFilters from './TodoFilters';
import { useTodo } from '../../context/TodoContext';
import { FiClipboard } from 'react-icons/fi';

export default function TodoList() {
    const { todos } = useTodo();

    if (todos.length === 0) {
        return (
            <div className="text-center py-12">
                <FiClipboard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
                <p className="text-gray-500">Add your first task to get started!</p>
            </div>
        );
    }

    return (
        <div className="mt-6">
            <div className="space-y-3 mt-4 max-h-96 overflow-y-auto pr-2 pt-2">
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );
}
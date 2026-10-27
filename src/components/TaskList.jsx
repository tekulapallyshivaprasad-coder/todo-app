import React from 'react';
import TaskItem from './TaskItem';
import { ClipboardList, SearchX } from 'lucide-react';

export default function TaskList({
  tasks,
  totalTasksCount,
  onToggleComplete,
  onDelete,
  onEdit,
  onResetFilters
}) {
  if (totalTasksCount === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-wrapper">
          <ClipboardList size={40} />
        </div>
        <h3>No tasks in your list</h3>
        <p>Type in a task title above to start organizing your day!</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-wrapper muted">
          <SearchX size={40} />
        </div>
        <h3>No matching tasks found</h3>
        <p>Try refining your search keyword or switching category/status filters.</p>
        <button 
          type="button" 
          className="btn-reset-filters"
          onClick={onResetFilters}
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

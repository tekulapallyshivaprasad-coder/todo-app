import React, { useState } from 'react';
import { 
  Check, 
  Trash2, 
  Edit3, 
  Calendar, 
  Tag, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../constants';

export default function TaskItem({
  task,
  onToggleComplete,
  onDelete,
  onEdit
}) {
  const [showNotes, setShowNotes] = useState(false);

  const categoryObj = CATEGORIES.find(c => c.id === task.category) || {
    label: task.category,
    color: '#6366f1'
  };

  const priorityObj = PRIORITIES.find(p => p.id === task.priority) || {
    label: task.priority,
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.12)'
  };

  // Due date calculation
  const todayStr = new Date().toISOString().split('T')[0];
  let dueDateInfo = null;

  if (task.dueDate) {
    const isOverdue = !task.completed && task.dueDate < todayStr;
    const isDueToday = !task.completed && task.dueDate === todayStr;
    const formatted = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(new Date(task.dueDate + 'T00:00:00'));

    dueDateInfo = {
      text: isOverdue ? `Overdue: ${formatted}` : isDueToday ? 'Due Today' : `Due ${formatted}`,
      isOverdue,
      isDueToday
    };
  }

  return (
    <div className={`task-item-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-item-main">
        {/* Custom Checkbox */}
        <button
          type="button"
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggleComplete(task.id)}
          aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
        >
          {task.completed && <Check size={16} strokeWidth={3} />}
        </button>

        {/* Content */}
        <div className="task-content">
          <div className="task-header-row">
            <span className={`task-title ${task.completed ? 'strikethrough' : ''}`}>
              {task.title}
            </span>
          </div>

          {/* Badges row */}
          <div className="task-meta-row">
            {/* Priority */}
            <span 
              className="meta-badge priority-badge"
              style={{
                color: priorityObj.color,
                backgroundColor: priorityObj.bg,
                borderColor: `${priorityObj.color}40`
              }}
            >
              <AlertCircle size={12} />
              {priorityObj.label}
            </span>

            {/* Category */}
            <span 
              className="meta-badge category-badge"
              style={{
                color: categoryObj.color,
                backgroundColor: `${categoryObj.color}15`,
                borderColor: `${categoryObj.color}35`
              }}
            >
              <Tag size={12} />
              {categoryObj.label}
            </span>

            {/* Due Date */}
            {dueDateInfo && (
              <span 
                className={`meta-badge date-badge ${
                  dueDateInfo.isOverdue 
                    ? 'overdue' 
                    : dueDateInfo.isDueToday 
                    ? 'due-today' 
                    : ''
                }`}
              >
                {dueDateInfo.isOverdue ? (
                  <AlertCircle size={12} />
                ) : dueDateInfo.isDueToday ? (
                  <Clock size={12} />
                ) : (
                  <Calendar size={12} />
                )}
                {dueDateInfo.text}
              </span>
            )}

            {/* Show notes toggle button */}
            {task.description && (
              <button 
                type="button"
                className="btn-toggle-notes"
                onClick={() => setShowNotes(!showNotes)}
                title={showNotes ? 'Hide notes' : 'View notes'}
              >
                {showNotes ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span>{showNotes ? 'Hide notes' : 'Notes'}</span>
              </button>
            )}
          </div>

          {/* Expandable description */}
          {task.description && showNotes && (
            <div className="task-description-box">
              <p>{task.description}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="task-actions">
          <button
            type="button"
            className="action-icon-btn edit-icon"
            onClick={() => onEdit(task)}
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit3 size={16} />
          </button>
          <button
            type="button"
            className="action-icon-btn delete-icon"
            onClick={() => onDelete(task.id)}
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { CheckCircle2, Clock, ListTodo, AlertTriangle } from 'lucide-react';

export default function TaskStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;
  
  const todayStr = new Date().toISOString().split('T')[0];
  const overdue = tasks.filter(t => !t.completed && t.dueDate && t.dueDate < todayStr).length;

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  let motivationalText = "Add a task to kickstart your productivity!";
  if (total > 0) {
    if (percentage === 100) {
      motivationalText = "🎉 Outstanding! All tasks are completed!";
    } else if (percentage >= 70) {
      motivationalText = "🔥 You're crushing it! Almost finished!";
    } else if (percentage >= 40) {
      motivationalText = "🚀 Great momentum! Keep going!";
    } else {
      motivationalText = "💡 Stay focused and tackle one task at a time.";
    }
  }

  return (
    <div className="stats-card">
      <div className="stats-header">
        <div>
          <span className="stats-title">Progress Overview</span>
          <p className="stats-subtitle">{motivationalText}</p>
        </div>
        <div className="stats-percentage-badge">
          {percentage}%
        </div>
      </div>

      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon-wrap info">
            <ListTodo size={18} />
          </div>
          <div>
            <span className="stat-num">{total}</span>
            <span className="stat-name">Total</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon-wrap warning">
            <Clock size={18} />
          </div>
          <div>
            <span className="stat-num">{active}</span>
            <span className="stat-name">Pending</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon-wrap success">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <span className="stat-num">{completed}</span>
            <span className="stat-name">Completed</span>
          </div>
        </div>

        {overdue > 0 && (
          <div className="stat-item">
            <div className="stat-icon-wrap danger">
              <AlertTriangle size={18} />
            </div>
            <div>
              <span className="stat-num text-danger">{overdue}</span>
              <span className="stat-name">Overdue</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

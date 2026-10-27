import React, { useState } from 'react';
import { Plus, Calendar, Tag, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../constants';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      id: 'task-' + Date.now(),
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString()
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setShowDetails(false);
  };

  const setShortcutDate = (daysFromNow) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    setDueDate(d.toISOString().split('T')[0]);
  };

  return (
    <form className="task-form-card" onSubmit={handleSubmit}>
      <div className="task-input-primary">
        <input 
          type="text" 
          className="task-title-input" 
          placeholder="Add a new task (e.g. 'Finish report by Friday')..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button 
          type="button" 
          className="btn-toggle-details"
          onClick={() => setShowDetails(!showDetails)}
          title="More task options"
        >
          {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          <span>{showDetails ? 'Fewer options' : 'More options'}</span>
        </button>
        <button 
          type="submit" 
          className="btn-submit-task"
          disabled={!title.trim()}
        >
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      </div>

      {showDetails && (
        <div className="task-input-secondary">
          <textarea 
            className="task-desc-input" 
            placeholder="Add detailed notes or descriptions (optional)..."
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="task-options-grid">
            {/* Category Select */}
            <div className="option-group">
              <label className="option-label">
                <Tag size={14} /> Category
              </label>
              <select 
                className="select-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Select */}
            <div className="option-group">
              <label className="option-label">
                <AlertCircle size={14} /> Priority
              </label>
              <div className="priority-pills">
                {PRIORITIES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`priority-pill ${priority === p.id ? 'active' : ''}`}
                    style={{
                      '--pill-color': p.color,
                      '--pill-bg': p.bg
                    }}
                    onClick={() => setPriority(p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Due Date */}
            <div className="option-group">
              <label className="option-label">
                <Calendar size={14} /> Due Date
              </label>
              <div className="date-input-wrap">
                <input 
                  type="date" 
                  className="date-input"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <div className="date-shortcuts">
                  <button 
                    type="button" 
                    className="date-badge-btn"
                    onClick={() => setShortcutDate(0)}
                  >
                    Today
                  </button>
                  <button 
                    type="button" 
                    className="date-badge-btn"
                    onClick={() => setShortcutDate(1)}
                  >
                    Tomorrow
                  </button>
                  <button 
                    type="button" 
                    className="date-badge-btn"
                    onClick={() => setShortcutDate(7)}
                  >
                    Next Week
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

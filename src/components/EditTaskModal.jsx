import React, { useState, useEffect } from 'react';
import { X, Calendar, Tag, AlertCircle, Save } from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../constants';

export default function EditTaskModal({ task, onSave, onClose }) {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [category, setCategory] = useState(task.category || 'personal');
  const [priority, setPriority] = useState(task.priority || 'medium');
  const [dueDate, setDueDate] = useState(task.dueDate || '');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      ...task,
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      dueDate: dueDate || null
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Task</h3>
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="input-label">Task Title</label>
            <input
              type="text"
              className="modal-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="input-label">Notes & Description</label>
            <textarea
              className="modal-textarea"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Additional notes..."
            />
          </div>

          <div className="modal-form-grid">
            <div className="form-group">
              <label className="input-label">
                <Tag size={14} /> Category
              </label>
              <select
                className="modal-select"
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

            <div className="form-group">
              <label className="input-label">
                <AlertCircle size={14} /> Priority
              </label>
              <select
                className="modal-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">
              <Calendar size={14} /> Due Date
            </label>
            <input
              type="date"
              className="modal-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-modal-save"
              disabled={!title.trim()}
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

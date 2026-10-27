import React, { useRef } from 'react';
import { 
  CheckCircle2, 
  Moon, 
  Sun, 
  Download, 
  Upload, 
  Trash2, 
  Sparkles 
} from 'lucide-react';

export default function Header({ 
  theme, 
  setTheme, 
  tasks, 
  onClearCompleted, 
  onExportTasks, 
  onImportTasks 
}) {
  const fileInputRef = useRef(null);

  const todayStr = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  const completedCount = tasks.filter(t => t.completed).length;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            onImportTasks(imported);
          } else {
            alert('Invalid backup file format. Expected a task list.');
          }
        } catch (err) {
          alert('Failed to parse the imported JSON file.');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="brand">
          <div className="brand-icon-wrapper">
            <CheckCircle2 className="brand-icon" size={28} />
          </div>
          <div>
            <h1 className="brand-title">TaskFlow</h1>
            <p className="brand-subtitle">{todayStr}</p>
          </div>
        </div>

        <div className="header-actions">
          <button 
            type="button" 
            className="action-btn theme-toggle" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            type="button"
            className="action-btn"
            onClick={onExportTasks}
            title="Export tasks to JSON"
            aria-label="Export Tasks"
          >
            <Download size={18} />
            <span className="btn-label">Export</span>
          </button>

          <button 
            type="button"
            className="action-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Import tasks from JSON"
            aria-label="Import Tasks"
          >
            <Upload size={18} />
            <span className="btn-label">Import</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".json" 
            style={{ display: 'none' }} 
          />

          {completedCount > 0 && (
            <button 
              type="button"
              className="action-btn danger-btn"
              onClick={onClearCompleted}
              title={`Clear ${completedCount} completed task(s)`}
              aria-label="Clear Completed"
            >
              <Trash2 size={18} />
              <span className="btn-label">Clear Done ({completedCount})</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

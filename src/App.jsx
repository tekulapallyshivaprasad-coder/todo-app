import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import TaskStats from './components/TaskStats';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import EditTaskModal from './components/EditTaskModal';
import { INITIAL_TASKS } from './constants';
import './App.css';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('taskflow_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  // Apply theme to root html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('taskflow_theme', theme);
  }, [theme]);

  // Tasks state
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('taskflow_tasks');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse tasks from localStorage', e);
    }
    return INITIAL_TASKS;
  });

  // Save tasks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }, [tasks]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt-desc');

  // Modal edit state
  const [editingTask, setEditingTask] = useState(null);

  // Trigger celebration confetti
  const triggerConfetti = (isGrand = false) => {
    try {
      if (isGrand) {
        // Multi-stage confetti celebration
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const frame = () => {
          confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
          if (Date.now() < animationEnd) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      } else {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    } catch (e) {
      // Ignore if canvas-confetti fails
    }
  };

  // Add task handler
  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // Toggle complete handler
  const handleToggleComplete = (id) => {
    setTasks((prev) => {
      const updated = prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          if (nextCompleted) {
            // Check if all other tasks will be completed
            const otherTasks = prev.filter((item) => item.id !== id);
            const allWillBeDone = otherTasks.length > 0 && otherTasks.every((item) => item.completed);
            if (allWillBeDone) {
              triggerConfetti(true);
            } else {
              triggerConfetti(false);
            }
          }
          return { ...t, completed: nextCompleted };
        }
        return t;
      });
      return updated;
    });
  };

  // Delete task handler
  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Edit task save handler
  const handleSaveEdit = (updatedTask) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setEditingTask(null);
  };

  // Clear completed tasks handler
  const handleClearCompleted = () => {
    const completedCount = tasks.filter((t) => t.completed).length;
    if (completedCount === 0) return;
    if (window.confirm(`Are you sure you want to remove ${completedCount} completed task(s)?`)) {
      setTasks((prev) => prev.filter((t) => !t.completed));
    }
  };

  // Export tasks as JSON
  const handleExportTasks = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `taskflow-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import tasks
  const handleImportTasks = (importedTasks) => {
    if (window.confirm(`Import ${importedTasks.length} task(s)? This will merge with your current list.`)) {
      // Merge unique tasks by id
      setTasks((prev) => {
        const existingIds = new Set(prev.map((t) => t.id));
        const newItems = importedTasks.filter((t) => !existingIds.has(t.id));
        return [...newItems, ...prev];
      });
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setSortBy('createdAt-desc');
  };

  // Filter & Sort tasks
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Status filter
    if (statusFilter === 'active') {
      result = result.filter((t) => !t.completed);
    } else if (statusFilter === 'completed') {
      result = result.filter((t) => t.completed);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((t) => t.category === categoryFilter);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'createdAt-asc') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortBy === 'createdAt-desc') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'dueDate-asc') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }
      if (sortBy === 'priority-desc') {
        const pWeight = { high: 3, medium: 2, low: 1 };
        return (pWeight[b.priority] || 0) - (pWeight[a.priority] || 0);
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [tasks, statusFilter, categoryFilter, searchQuery, sortBy]);

  // Counts for tabs
  const taskCounts = useMemo(() => {
    return {
      all: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length
    };
  }, [tasks]);

  return (
    <div className="app-wrapper">
      <div className="app-container">
        {/* Header */}
        <Header
          theme={theme}
          setTheme={setTheme}
          tasks={tasks}
          onClearCompleted={handleClearCompleted}
          onExportTasks={handleExportTasks}
          onImportTasks={handleImportTasks}
        />

        {/* Overview Stats */}
        <TaskStats tasks={tasks} />

        {/* Task Form */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Filters, Categories & Sorting */}
        <TaskFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          taskCounts={taskCounts}
        />

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          totalTasksCount={tasks.length}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
          onEdit={(task) => setEditingTask(task)}
          onResetFilters={handleResetFilters}
        />

        {/* Edit Modal */}
        {editingTask && (
          <EditTaskModal
            task={editingTask}
            onSave={handleSaveEdit}
            onClose={() => setEditingTask(null)}
          />
        )}

        {/* Footer */}
        <footer className="app-footer">
          <p>
            TaskFlow • Designed for focus and flow •{' '}
            <a
              href="https://github.com/tekulapallyshivaprasad-coder/todo-app"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Repository
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

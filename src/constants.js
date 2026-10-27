export const CATEGORIES = [
  { id: 'all', label: 'All Categories', icon: 'LayoutGrid', color: '#6366f1' },
  { id: 'work', label: 'Work', icon: 'Briefcase', color: '#3b82f6' },
  { id: 'personal', label: 'Personal', icon: 'User', color: '#10b981' },
  { id: 'study', label: 'Study', icon: 'BookOpen', color: '#8b5cf6' },
  { id: 'shopping', label: 'Shopping', icon: 'ShoppingCart', color: '#ec4899' },
  { id: 'health', label: 'Health', icon: 'HeartPulse', color: '#ef4444' },
  { id: 'other', label: 'Other', icon: 'Tag', color: '#f59e0b' }
];

export const PRIORITIES = [
  { id: 'low', label: 'Low', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
  { id: 'medium', label: 'Medium', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
  { id: 'high', label: 'High', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)' }
];

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Welcome to TaskFlow! 👋',
    description: 'Check out the clean design, filters, and priority tags.',
    category: 'personal',
    priority: 'low',
    completed: true,
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'task-2',
    title: 'Complete project documentation 📝',
    description: 'Write up the README and push code to GitHub repository.',
    category: 'work',
    priority: 'high',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'task-3',
    title: 'Review React & Vite best practices ⚡',
    description: 'Study component structure and modern state management.',
    category: 'study',
    priority: 'medium',
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-4',
    title: 'Weekly grocery shopping 🛒',
    description: 'Fruits, green vegetables, oat milk, and coffee beans.',
    category: 'shopping',
    priority: 'low',
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  }
];

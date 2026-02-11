import type { Project, Task, User } from '../types';

export function initializeSampleData() {
  const hasData = localStorage.getItem('pm_projects') || localStorage.getItem('pm_tasks');
  const hasClearedData = localStorage.getItem('pm_data_cleared');
  
  // Don't initialize sample data if:
  // 1. Data already exists
  // 2. User has previously cleared data (indicating they want to start fresh)
  if (!hasData && !hasClearedData) {
    // Initialize with empty arrays instead of sample data
    localStorage.setItem('pm_projects', JSON.stringify([]));
    localStorage.setItem('pm_tasks', JSON.stringify([]));
  }
}
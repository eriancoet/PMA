import React from 'react';
import { Link } from 'react-router';
import { MoreVertical, Trash2, Edit, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import type { Project } from '../types';
import { useData } from '../contexts/DataContext';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/button';


interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const { getProjectTasks } = useData();
  const tasks = getProjectTasks(project.id);
  const completedTasks = tasks.filter((task) => task.status === 'done').length;
  const totalTasks = tasks.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: project.color }}
          />
          <Link
            to={`/projects/${project.id}`}
            className="text-lg font-semibold hover:text-blue-600 transition-colors"
          >
            {project.name}
          </Link>
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[160px] z-50"
              align="end"
            >
              <DropdownMenu.Item
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded outline-none"
                onSelect={() => onEdit(project)}
              >
                <Edit className="h-4 w-4" />
                Edit
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-red-50 text-red-600 rounded outline-none"
                onSelect={() => onDelete(project)}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
     {project.description && (
  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
    {project.description}
  </p>
)}

<div className="flex items-center justify-between">
  <div className="text-sm text-gray-500">
    {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}
  </div>

  <Link
    to={`/projects/${project.id}`}
    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
  >
    <Plus className="h-4 w-4" />
    Add Task
  </Link>
</div>

<div className="flex items-center justify-between mt-4">
  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-blue-600 rounded-full transition-all"
      style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
    />
  </div>
  <span className="text-sm text-gray-600">
    {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
  </span>
</div>

    </motion.div>
  );
}
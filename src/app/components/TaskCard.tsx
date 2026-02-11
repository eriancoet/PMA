import React from 'react';
import { format } from 'date-fns';
import { MoreVertical, Calendar, Trash2, Edit } from 'lucide-react';
import type { Task } from '../types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/button';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  draggable?: boolean;
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

export function TaskCard({ task, onEdit, onDelete, draggable = false }: TaskCardProps) {
  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => onEdit(task)}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium flex-1">{task.title}</h4>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
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
                onSelect={(e) => {
                  e.preventDefault();
                  onEdit(task);
                }}
              >
                <Edit className="h-4 w-4" />
                Edit
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-red-50 text-red-600 rounded outline-none"
                onSelect={(e) => {
                  e.preventDefault();
                  onDelete(task);
                }}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
        {task.dueDate && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            {format(new Date(task.dueDate), 'MMM d, yyyy')}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, LayoutGrid, LayoutList, FolderKanban, CheckCircle2, Clock } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import type { Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { StatsCard } from '../components/StatsCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export function ProjectsPage() {
  const { projects, createProject, updateProject, deleteProject, tasks } = useData();
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [projects, search]);

  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === 'done').length;
    const inProgressTasks = tasks.filter((task) => task.status === 'doing').length;

    return {
      totalProjects: projects.length,
      totalTasks,
      completedTasks,
      inProgressTasks,
    };
  }, [projects, tasks]);

  const handleCreateOrUpdate = (projectData: Partial<Project>) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
      toast.success('Project updated successfully');
    } else {
      createProject(projectData as Omit<Project, 'id' | 'createdAt' | 'updatedAt'>);
      toast.success('Project created successfully');
    }
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleDelete = (project: Project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      toast.success('Project deleted successfully');
      setProjectToDelete(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-gray-600">Manage your projects and track progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={FolderKanban}
          color="bg-blue-500"
        />
        <StatsCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon={LayoutGrid}
          color="bg-purple-500"
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgressTasks}
          icon={Clock}
          color="bg-yellow-500"
        />
        <StatsCard
          title="Completed"
          value={stats.completedTasks}
          icon={CheckCircle2}
          color="bg-green-500"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button onClick={() => {
            setEditingProject(null);
            setModalOpen(true);
          }}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <LayoutGrid className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
          <p className="text-gray-600 mb-6">
            {search
              ? 'No projects match your search'
              : 'Create your first project to get started'}
          </p>
          {!search && (
            <Button onClick={() => {
              setEditingProject(null);
              setModalOpen(true);
            }}>
              <Plus className="h-4 w-4" />
              Create Project
            </Button>
          )}
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-3'
          }
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <ProjectModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleCreateOrUpdate}
        project={editingProject}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${projectToDelete?.name}"? This will also delete all tasks in this project. This action cannot be undone.`}
        confirmText="Delete"
      />
    </div>
  );
}
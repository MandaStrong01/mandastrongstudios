import { useState, useEffect } from 'react';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  Project
} from '../lib/storage';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const create = async (name: string, description?: string): Promise<Project> => {
    try {
      const project = await createProject(name, description);
      setProjects(prev => [project, ...prev]);
      return project;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const update = async (
    projectId: string,
    updates: Partial<Pick<Project, 'name' | 'description' | 'timeline_data' | 'duration'>>
  ): Promise<Project> => {
    try {
      const updated = await updateProject(projectId, updates);
      setProjects(prev => prev.map(p => p.id === projectId ? updated : p));
      return updated;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const remove = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    projects,
    loading,
    error,
    create,
    update,
    remove,
    refresh: loadProjects
  };
}

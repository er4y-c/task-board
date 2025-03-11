import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { taskServices } from '@/services/task';
import { Task } from '@/types/task';

export function useTasks() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await taskServices.getTasks();
      return res.data;
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: ({ task }: { task: Task }) => taskServices.createTask(task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, task }: { id: string; task: Task }) => taskServices.updateTask(id, task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: taskServices.deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  return {
    tasks: data || [],
    isLoading,
    error,
    createTask: createTaskMutation.mutateAsync,
    updateTask: updateTaskMutation.mutateAsync,
    deleteTask: deleteTaskMutation.mutateAsync,
  };
}

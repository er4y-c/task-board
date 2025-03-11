import { Task, TaskStatus } from '@/types/task';
import { create } from 'zustand';

interface TaskDialogState {
  isOpen: boolean;
  task?: Task;
  initialStatus?: TaskStatus;
  openDialog: (task?: Task, initialStatus?: TaskStatus) => void;
  closeDialog: () => void;
}

export const useTaskDialog = create<TaskDialogState>((set) => ({
  isOpen: false,
  task: undefined,
  initialStatus: undefined,

  openDialog: (task, initialStatus) =>
    set({
      isOpen: true,
      task,
      initialStatus,
    }),

  closeDialog: () =>
    set({
      isOpen: false,
      task: undefined,
      initialStatus: undefined,
    }),
}));

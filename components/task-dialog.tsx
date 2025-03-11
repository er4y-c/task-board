import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useTaskDialog } from '@/hooks/use-task-dialog';
import { useTaskStore } from '@/stores/taskStore';
import { TaskStatus } from '@/types/task';
import { taskFormSchema } from '@/utils/validation';
import { useTasks } from '@/hooks/use-tasks';
import { Task } from '@/types/task';

type TaskFormValues = z.infer<typeof taskFormSchema>;

export default function TaskDialog() {
  const { isOpen, task, initialStatus, closeDialog } = useTaskDialog();
  const { users } = useTaskStore();

  const { createTask, updateTask } = useTasks();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'TODO' as TaskStatus,
      reporter: users[0]?.full_name || '',
      assignee: 'none',
      storyPoints: undefined,
    },
  });

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description || '',
        status: task.status,
        reporter: task.reporter,
        assignee: task.assignee ? task.assignee : 'none',
        storyPoints: task.storyPoints,
      });
    } else if (initialStatus) {
      form.reset({
        ...form.getValues(),
        status: initialStatus,
      });
    } else {
      form.reset({
        title: '',
        description: '',
        status: 'TODO',
        reporter: users[0]?.full_name || '',
        assignee: 'none',
        storyPoints: undefined,
      });
    }
  }, [task, initialStatus, form, users]);

  const onSubmit = async (values: TaskFormValues) => {
    const reporter = users.find((user) => user.full_name === values.reporter)!;
    const assignee =
      values.assignee === 'none' ? undefined : users.find((user) => user.id === values.assignee);

    const taskData: Task = {
      title: values.title,
      description: values.description || '',
      status: values.status,
      reporter: reporter.full_name,
      assignee: assignee?.full_name,
      storyPoints: values.storyPoints,
    };

    if (task) {
      await updateTask({ id: task.id!, task: taskData });
    } else {
      await createTask({ task: taskData });
    }

    closeDialog();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{task ? 'Görevi Düzenle' : 'Yeni Görev'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Görev başlığı" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Görev açıklaması" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Durum seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TODO">To Do</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="REVIEW">Review</SelectItem>
                        <SelectItem value="DONE">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storyPoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Story Point</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="reporter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reporter</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Kişi seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.full_name}>
                            {user.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Kişi seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">Unassigned</SelectItem>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.full_name}>
                            {user.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="sm:justify-end">
              <Button type="button" variant="secondary" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">{task ? 'Update' : 'Create'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

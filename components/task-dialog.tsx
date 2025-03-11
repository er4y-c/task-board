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

// Form şeması
const taskFormSchema = z.object({
  title: z.string().min(1, 'Başlık gereklidir'),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE']),
  reporterId: z.string().min(1, 'Raporlayan kişi gereklidir'),
  assigneeId: z.string().optional(),
  storyPoints: z.coerce.number().int().min(0).max(100).optional(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

export default function TaskDialog() {
  const { isOpen, task, initialStatus, closeDialog } = useTaskDialog();
  const { addTask, updateTask, getUsers } = useTaskStore();
  const users = getUsers();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'TODO' as TaskStatus,
      reporterId: users[0]?.id || '',
      assigneeId: '',
      storyPoints: undefined,
    },
  });

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description || '',
        status: task.status,
        reporterId: task.reporter.id,
        assigneeId: task.assignee?.id || '',
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
        reporterId: users[0]?.id || '',
        assigneeId: '',
        storyPoints: undefined,
      });
    }
  }, [task, initialStatus, form, users]);

  const onSubmit = (values: TaskFormValues) => {
    const reporter = users.find((user) => user.id === values.reporterId)!;
    const assignee = values.assigneeId
      ? users.find((user) => user.id === values.assigneeId)
      : undefined;

    if (task) {
      updateTask(task.id, {
        title: values.title,
        description: values.description || '',
        status: values.status,
        reporter,
        assignee,
        storyPoints: values.storyPoints,
      });
    } else {
      addTask({
        title: values.title,
        description: values.description || '',
        status: values.status,
        reporter,
        assignee,
        storyPoints: values.storyPoints,
      });
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
                  <FormLabel>Başlık</FormLabel>
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
                  <FormLabel>Açıklama</FormLabel>
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
                    <FormLabel>Durum</FormLabel>
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
                name="reporterId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raporlayan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Kişi seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
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
                name="assigneeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Atanan Kişi</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Kişi seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Atanmadı</SelectItem>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
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
                İptal
              </Button>
              <Button type="submit">{task ? 'Güncelle' : 'Oluştur'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

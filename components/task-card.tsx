import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreHorizontal } from 'lucide-react';

import { Task } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTasks } from '@/hooks/use-tasks';
import { useTaskDialog } from '@/hooks/use-task-dialog';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { deleteTask } = useTasks();
  const { openDialog } = useTaskDialog();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id!,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="bg-card cursor-grab"
      {...attributes}
      {...listeners}
    >
      <CardHeader className="p-3 pb-0 flex flex-row justify-between items-start">
        <CardTitle className="text-sm font-medium line-clamp-2">{task.title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openDialog(task)}>Düzenle</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => deleteTask(task.id!)}>
              Sil
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-3 pt-2">
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{task.description}</p>
        )}

        <div className="flex justify-between items-center mt-2">
          {task.storyPoints !== undefined && (
            <Badge variant="secondary" className="h-6 px-2">
              {task.storyPoints} SP
            </Badge>
          )}

          {task.assignee && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={task.assignee.avatar} alt={task.assignee.full_name} />
              <AvatarFallback>{task.assignee.full_name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

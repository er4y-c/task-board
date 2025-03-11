import React from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PlusCircle } from 'lucide-react';

import { Column, Task } from '@/types/task';
import TaskCard from './task-card';
import TaskDialog from './task-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTaskDialog } from '@/hooks/use-task-dialog';

interface TaskColumnProps {
  column: Column;
  tasks: Task[];
}

export default function TaskColumn({ column, tasks }: TaskColumnProps) {
  const { openDialog } = useTaskDialog();

  const { setNodeRef, transform, transition } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <>
      <Card ref={setNodeRef} style={style} className="flex flex-col w-80 h-full min-h-screen">
        <CardHeader className="p-4 pb-2 flex flex-row justify-between items-center">
          <CardTitle className="text-base font-medium">
            {column.title} ({tasks?.length})
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={() => openDialog(undefined, column.id)}>
            <PlusCircle className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col gap-2 p-2 overflow-auto">
          <SortableContext items={tasks?.map((task: Task) => task.id as string)}>
            {tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
          </SortableContext>

          {tasks?.length === 0 && (
            <div className="flex-grow flex items-center justify-center text-muted-foreground p-4 text-center border border-dashed rounded-md">
              No tasks yet
            </div>
          )}
        </CardContent>
      </Card>

      <TaskDialog />
    </>
  );
}

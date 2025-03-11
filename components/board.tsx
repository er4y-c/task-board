import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { Task, TaskStatus } from '@/types/task';
import { columns } from '@/constants/columns';
import { useTaskStore } from '@/stores/taskStore';
import TaskColumn from './task-column';
import TaskCard from './task-card';
import { useTasks } from '@/hooks/use-tasks';

export default function Board() {
  const { tasks, updateTask } = useTasks();
  const moveTask = useTaskStore((state) => state.moveTask);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  // Her sütuna ait görevleri filtreleme
  const getTasksByColumn = (columnId: TaskStatus) => {
    return tasks?.filter((task: Task) => task.status === columnId);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeTask = tasks.find((task: Task) => task.id === active.id);
    if (activeTask) {
      setActiveTask(activeTask);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Eğer aynı ID üzerinde sürükleme yapılıyorsa işlem yapma
    if (activeId === overId) return;

    // Bir görevin bir sütunun üzerine sürüklenmesi
    const isActiveATask = active.data.current?.type === 'Task';
    const isOverAColumn = over.data.current?.type === 'Column';

    if (isActiveATask && isOverAColumn) {
      const status = over.id as TaskStatus;
      moveTask(activeId as string, status);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeId = active.id;

    // Ensure we have the active task from state
    if (!activeTask) {
      setActiveTask(null);
      return;
    }

    // Update when dragging on top of another task
    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';
    const isOverAColumn = over.data.current?.type === 'Column';

    if (isActiveATask && isOverATask) {
      const overTask = tasks.find((task: Task) => task.id === over.id);
      if (overTask) {
        moveTask(activeId as string, overTask.status);
        const updatedTask = { ...activeTask, status: overTask.status };
        updateTask({ id: activeId as string, task: updatedTask });
      }
    }

    // Update when dragging onto a column
    if (isActiveATask && isOverAColumn) {
      const status = over.id as TaskStatus;
      moveTask(activeId as string, status);
      const updatedTask = { ...activeTask, status };
      updateTask({ id: activeId as string, task: updatedTask });
    }

    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full w-full gap-4 overflow-x-auto p-4">
        {columns.map((column) => (
          <TaskColumn key={column.id} column={column} tasks={getTasksByColumn(column.id)} />
        ))}
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <DragOverlay>{activeTask && <TaskCard task={activeTask} />}</DragOverlay>,
          document.body,
        )}
    </DndContext>
  );
}

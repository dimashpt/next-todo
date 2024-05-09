'use client';

import { z } from 'zod';

import { Checkbox } from '@/components/atoms/checkbox';
import { Button } from '@/components/atoms';
import { EditIcon, GripVertical, Trash } from 'lucide-react';
import { Reorder, useDragControls } from 'framer-motion';

const todoSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1),
  done: z.boolean().optional(),
});

type Todo = z.infer<typeof todoSchema>;

type TodoItemProps = {
  todo: Todo;
  index: number;
  active: boolean;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  onChangeStatus: (index: number, done: Todo['done']) => void;
  typedText?: string;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  active,
  onEdit,
  onRemove,
  onChangeStatus,
  typedText,
}) => {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      key={todo.id}
      value={todo}
      dragListener={false}
      dragControls={dragControls}
      initial="hidden"
      animate="visible"
      exit="hidden"
      custom={(index + 1) * 0.2}
      layoutId={todo.id}
      transition={{
        type: 'easeInOut',
        duration: 0.3,
      }}
      variants={{
        hidden: { y: -20, opacity: 0 },
        visible: (custom) => ({
          y: 0,
          opacity: 1,
          transition: { delay: custom },
        }),
      }}
      className="flex border border-solid py-2 px-3 rounded-md items-center gap-3 hover:bg-accent hover:text-accent-foreground"
    >
      <GripVertical
        size={16}
        className="cursor-grab"
        onPointerDown={(e) => dragControls.start(e)}
        style={{ touchAction: 'none' }}
      />
      <Checkbox
        checked={todo.done}
        onCheckedChange={(value) =>
          onChangeStatus(index, value as Todo['done'])
        }
      />
      <div className={`flex-auto ${todo.done && 'line-through'}`}>
        {active ? typedText : todo.description}
      </div>
      {active ? (
        <Button size="sm" variant="ghost" type="submit" form="todo-form">
          Save
        </Button>
      ) : (
        <>
          <Button size="icon" variant="link" onClick={() => onEdit(index)}>
            <EditIcon size={16} />
          </Button>
          <Button size="icon" variant="link" onClick={() => onRemove(index)}>
            <Trash size={16} className="text-destructive" />
          </Button>
        </>
      )}
    </Reorder.Item>
  );
};

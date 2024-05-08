'use client';

import { NextPage } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/atoms/form';
import { Input } from '@/components/atoms/input';
import { Checkbox } from '@/components/atoms/checkbox';
import { Button } from '@/components/atoms';
import { EditIcon, Trash } from 'lucide-react';

const todoSchema = z.object({
  description: z.string().min(2),
  done: z.boolean().optional(),
});

type Todo = z.infer<typeof todoSchema>;

const RootPage: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<number>();
  const form = useForm<Todo>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      description: '',
      done: false,
    },
  });

  function onSubmit(data: Todo): void {
    form.reset();

    if (activeTodo === undefined) {
      setTodos([data, ...todos]);

      return;
    }

    // Update existing todo
    setTodos((prev) => prev.map((todo, i) => (i === activeTodo ? data : todo)));
    setActiveTodo(undefined);
  }

  function onToggleStatus(index: number, value: Todo['done']): void {
    setTodos((prev) =>
      prev.map((todo, i) => (i === index ? { ...todo, done: value } : todo)),
    );
  }

  function onRemove(index: number): void {
    setTodos((prev) => prev.filter((_, i) => i !== index));
    setActiveTodo(undefined);
  }

  function onEditTodo(index: number): void {
    setActiveTodo(index);
    form.setValue('description', todos[index].description);
    form.setFocus('description');
  }

  return (
    <section className="flex flex-col h-full w-full">
      <div className="grid grid-cols-4">
        <div className="col-span-2 col-start-2">
          <h2 className="text-4xl text-center py-4">ToDo List</h2>
          <Form {...form}>
            <form
              id="todo-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="I want to do..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <ul className="flex flex-col gap-2 mt-5">
            {todos.map((todo, index) => (
              <li
                key={index}
                className={`flex border border-solid py-2 px-3 rounded-md items-center gap-2 ${![undefined, index].includes(activeTodo) && 'opacity-20'}`}
              >
                <Checkbox
                  checked={todo.done}
                  onCheckedChange={(value) =>
                    onToggleStatus(index, value as Todo['done'])
                  }
                />
                <div className="flex-auto">{todo.description}</div>
                {index === activeTodo ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    type="submit"
                    form="todo-form"
                  >
                    Save
                  </Button>
                ) : (
                  <>
                    <Button
                      size="icon"
                      variant="link"
                      onClick={() => onEditTodo(index)}
                    >
                      <EditIcon size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="link"
                      onClick={() => onRemove(index)}
                    >
                      <Trash size={16} className="text-destructive" />
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RootPage;

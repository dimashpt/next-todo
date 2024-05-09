'use client';

import { NextPage } from 'next';
import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@/components/atoms/form';
import { Input } from '@/components/atoms/input';
import { Checkbox } from '@/components/atoms/checkbox';
import { Button } from '@/components/atoms';
import { EditIcon, Trash } from 'lucide-react';
import { AnimatePresence, Reorder } from 'framer-motion';
import useLocalStorage from '@/hooks/use-local-storage';

const todoSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1),
  done: z.boolean().optional(),
});

type Todo = z.infer<typeof todoSchema>;

const RootPage: NextPage = () => {
  // TODO: Search todos ✅
  // TODO: Strikethrough completed todos ✅
  // TODO: Persist todos in local storage ✅
  // TODO: Refactor: split components
  // TODO: Fetch public API
  // TODO: Unit testing
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [activeTodo, setActiveTodo] = useState<string>();
  const [searchMode, setSearchMode] = useState(false);
  const form = useForm<Todo>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      description: '',
      done: false,
    },
  });
  const filteredTodos: Todo[] = useMemo(() => {
    return searchMode
      ? todos.filter((todo) => {
          const description = todo.description.toLowerCase();
          const search = form.watch('description').toLowerCase();

          return description.includes(search);
        })
      : todos;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('description'), searchMode, todos]);

  // listen for keydown events
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleKeyDown(event: KeyboardEvent): void {
    // listen esc to reset form and close edit mode
    if (event.key === 'Escape') {
      form.reset();
      setActiveTodo(undefined);
    }

    // listen ctrl + f or command + f to toggle search mode
    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
      event.preventDefault();
      form.setValue('description', '');
      form.setFocus('description');
      setSearchMode((prev) => !prev);
    }
  }

  function onSubmit(data: Todo): void {
    form.reset();

    if (activeTodo === undefined) {
      const generatedId = Math.random().toString(36).substring(2, 9);
      const value = {
        id: generatedId,
        done: false,
        ...data,
      };

      setTodos([value, ...todos]);

      return;
    }

    // Update existing todo
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === activeTodo
          ? {
              ...todo,
              description: data.description,
            }
          : todo,
      ),
    );
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

  function onEditTodo(id: string): void {
    const index = todos.findIndex((todo) => todo.id === id);

    setActiveTodo(id);
    form.setValue('description', todos[index].description);
    form.setFocus('description');
  }

  return (
    <section className="flex flex-col h-full w-full">
      <div className="grid grid-cols-4 p-5">
        <div className="col-span-4 md:col-span-2 md:col-start-2">
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
                      <Input
                        placeholder={
                          searchMode ? 'Search todo...' : 'I want to do...'
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-center">
                      ⌘ + f to search, esc to close, enter to submit
                    </FormDescription>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Reorder.Group
            axis="y"
            values={todos}
            onReorder={setTodos}
            className="flex flex-col gap-2 mt-5"
          >
            <AnimatePresence>
              {filteredTodos.map((todo, index) => (
                <Reorder.Item
                  key={todo.id}
                  value={todo}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  custom={(index + 1) * 0.2}
                  layoutId={todo.id}
                  transition={{
                    type: 'easeInOut',
                    duration: 0.3,
                  }}
                  whileHover={{ scale: 1.02, cursor: 'grab' }}
                  variants={{
                    hidden: { y: -20, opacity: 0 },
                    visible: (custom) => ({
                      y: 0,
                      opacity: 1,
                      transition: { delay: custom },
                    }),
                  }}
                  className={`flex border border-solid py-2 px-3 rounded-md items-center gap-3 hover:bg-accent hover:text-accent-foreground ${![undefined, todo.id].includes(activeTodo) && 'opacity-20'}`}
                >
                  <Checkbox
                    checked={todo.done}
                    onCheckedChange={(value) =>
                      onToggleStatus(index, value as Todo['done'])
                    }
                  />
                  <div className={`flex-auto ${todo.done && 'line-through'}`}>
                    {todo.id === activeTodo
                      ? form.watch('description')
                      : todo.description}
                  </div>
                  {todo.id === activeTodo ? (
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
                        onClick={() => onEditTodo(todo.id!)}
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
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </div>
      </div>
    </section>
  );
};

export default RootPage;

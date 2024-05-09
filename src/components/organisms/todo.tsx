'use client';

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
import { TodoItem } from '@/components/atoms';
import { AnimatePresence, Reorder } from 'framer-motion';
import useLocalStorage from '@/hooks/use-local-storage';
import { Switch } from '@/components/atoms/switch';
import { Label } from '@/components/atoms/label';
import Lottie from 'lottie-react';
import todoAnimation from '@/assets/animations/todo-animation.json';
import notFoundAnimation from '@/assets/animations/not-found.json';

const todoSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1),
  done: z.boolean().optional(),
});

type Todo = z.infer<typeof todoSchema>;

export const Todo: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [activeTodo, setActiveTodo] = useState<number>();
  const [searchMode, setSearchMode] = useState(false);
  const form = useForm<Todo>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      description: '',
      done: false,
    },
  });
  const isSearching = searchMode && form.watch('description').length > 0;

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
      toggleSearchMode();
    }
  }

  function onSubmit(data: Todo): void {
    if (searchMode) return;

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
      prev.map((todo, index) =>
        index === activeTodo
          ? {
              ...todo,
              description: data.description,
            }
          : todo,
      ),
    );
    setActiveTodo(undefined);
  }

  function onRemove(index: number): void {
    setTodos((prev) => prev.filter((_, i) => i !== index));
    setActiveTodo(undefined);
  }

  function onToggleStatus(index: number, value: Todo['done']): void {
    const todo = todos[index];
    const updatedTodo = { ...todo, done: value };

    // filter out the updated todo
    const filteredTodos = todos.filter((todo) => todo.id !== updatedTodo.id);
    const doneTodos = filteredTodos.filter((todo) => todo.done);
    const undoneTodos = filteredTodos.filter((todo) => !todo.done);

    setTodos((_) => {
      if (value) {
        // Move done todos to the top of the done's list
        return [...undoneTodos, updatedTodo, ...doneTodos];
      }

      // Move undone todos to the top of the undone's list
      return [updatedTodo, ...undoneTodos, ...doneTodos];
    });
  }

  function onEditTodo(index: number): void {
    setActiveTodo(index);
    form.setValue('description', todos[index].description);
    form.setFocus('description');
  }

  function toggleSearchMode(): void {
    if (!searchMode) form.setFocus('description');

    form.setValue('description', '');
    setSearchMode((prev) => !prev);
  }

  return (
    <>
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
                  <span className="hidden md:inline">
                    ⌘ + f to search, esc to close, enter to submit
                  </span>
                  <span className="md:hidden flex items-center justify-end gap-2">
                    <Label>Search Mode</Label>
                    <Switch
                      checked={searchMode}
                      onCheckedChange={toggleSearchMode}
                    />
                  </span>
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
        className="flex flex-col gap-2 mt-5 flex-auto overflow-x-hidden overflow-y-auto"
      >
        <AnimatePresence>
          {filteredTodos.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full">
              <Lottie
                className="h-2/3"
                animationData={isSearching ? notFoundAnimation : todoAnimation}
                loop={true}
              />
              <h1 className="text-3xl font-bold">
                {isSearching ? 'No todo found' : 'Nothing to do'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                {isSearching
                  ? 'Try another keyword or add a new todo'
                  : 'Add a new todo to get started'}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                active={activeTodo === index}
                onEdit={onEditTodo}
                onRemove={onRemove}
                onChangeStatus={onToggleStatus}
                typedText={form.watch('description')}
              />
            ))
          )}
        </AnimatePresence>
      </Reorder.Group>
    </>
  );
};

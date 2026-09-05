"use client";

import { useState, useMemo } from "react";
import { AddTodo } from "./AddTodo";
import { TodoItem } from "./TodoItem";
import type { Todo, TodoInsert } from "@/lib/todos";

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

// ── When Supabase is ready, replace this block ──────────────────────────────
// import { createClient } from "@/lib/supabase/client"
// and swap useState + handlers for async Supabase calls
// ────────────────────────────────────────────────────────────────────────────

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (insert: TodoInsert) => {
    const newTodo: Todo = {
      ...insert,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const { active, completed } = useMemo(() => {
    return {
      active: todos.filter((t) => !t.completed),
      completed: todos.filter((t) => t.completed),
    };
  }, [todos]);

  return (
    <div className="flex flex-col gap-8 max-w-[640px] w-full mx-auto">
      <AddTodo onAdd={handleAdd} />

      {/* Empty state */}
      {todos.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-[15px] text-[var(--text-muted)]">No tasks yet</p>
          <p className="text-[13px] text-[var(--text-muted)] opacity-60">
            Add something above to get started
          </p>
        </div>
      )}

      {/* Active tasks */}
      {active.length > 0 && (
        <div className="flex flex-col gap-1">
          {active.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Completed tasks */}
      {completed.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="text-[11px] text-[var(--text-muted)] px-4 mb-1 tracking-wide">
            Completed · {completed.length}
          </p>
          {completed.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

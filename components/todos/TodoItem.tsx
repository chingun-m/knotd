"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRIORITY_CONFIG } from "@/lib/todos";
import type { Todo } from "@/lib/todos";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        "group flex items-center gap-3 px-4 py-3 rounded-[8px]",
        "border border-transparent transition-colors duration-150",
        hovered && "bg-[var(--surface-2)]",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Priority dot */}
      <div
        className="h-1.5 w-1.5 rounded-full shrink-0 mt-px"
        style={{
          backgroundColor: todo.completed
            ? "var(--text-muted)"
            : PRIORITY_CONFIG[todo.priority].color,
        }}
      />

      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
        className={cn(
          "h-4 w-4 rounded-[4px] border shrink-0 flex items-center justify-center transition-colors duration-150",
          todo.completed
            ? "border-[var(--accent-hex)] bg-[var(--accent-hex)]"
            : "border-[var(--border-hex)] hover:border-[var(--accent-hex)]",
        )}
      >
        {todo.completed && (
          <svg
            width="9"
            height="7"
            viewBox="0 0 9 7"
            fill="none"
            className="text-white"
          >
            <path
              d="M1 3.5L3.5 6L8 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Text */}
      <span
        className={cn(
          "flex-1 text-[14px] leading-snug transition-colors duration-150",
          todo.completed
            ? "line-through text-[var(--text-muted)]"
            : "text-[var(--text)]",
        )}
      >
        {todo.text}
      </span>

      {/* Delete — only on hover */}
      <button
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
        className={cn(
          "text-[var(--text-muted)] hover:text-[#E05252] transition-colors duration-150",
          hovered ? "opacity-100" : "opacity-0",
        )}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

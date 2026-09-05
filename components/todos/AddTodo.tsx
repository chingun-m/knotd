"use client";

import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TodoInsert, TodoPriority } from "@/lib/todos";
import { PRIORITY_CONFIG } from "@/lib/todos";

interface AddTodoProps {
  onAdd: (todo: TodoInsert) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<TodoPriority>("medium");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd({ text: trimmed, completed: false, priority });
    setText("");
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Input row */}
      <div className="flex items-center gap-2 rounded-[10px] border border-[var(--border-hex)] bg-[var(--surface)] px-4 py-3 focus-within:border-[#5B6AF066] transition-colors">
        <Plus className="h-4 w-4 text-[var(--text-muted)] shrink-0" />
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          placeholder="Add a task..."
          className="flex-1 bg-transparent text-[14px] text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none"
          aria-label="New task"
        />

        {/* Priority selector */}
        <div className="flex items-center gap-1">
          {(["low", "medium", "high"] as TodoPriority[]).map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              aria-label={`Set priority ${p}`}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-150",
                priority === p ? "scale-125" : "opacity-40 hover:opacity-70",
              )}
              style={{
                backgroundColor: PRIORITY_CONFIG[p].color,
              }}
            />
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="text-[12px] text-[var(--text-muted)] hover:text-[var(--accent-hex)] disabled:opacity-30 disabled:pointer-events-none transition-colors ml-1"
        >
          Add
        </button>
      </div>

      {/* Priority hint */}
      <p className="text-[11px] text-[var(--text-muted)] pl-1">
        Priority:{" "}
        <span style={{ color: PRIORITY_CONFIG[priority].color }}>
          {PRIORITY_CONFIG[priority].label}
        </span>
      </p>
    </div>
  );
}

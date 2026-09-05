export type TodoPriority = "low" | "medium" | "high";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: TodoPriority;
  createdAt: string; // ISO string — matches Supabase timestamptz
}

// When Supabase is added, this type maps directly to your table row
export type TodoInsert = Omit<Todo, "id" | "createdAt">;

export const PRIORITY_CONFIG: Record<
  TodoPriority,
  { label: string; color: string }
> = {
  low: { label: "Low", color: "var(--text-muted)" },
  medium: { label: "Medium", color: "#E0A84A" },
  high: { label: "High", color: "#E05252" },
};

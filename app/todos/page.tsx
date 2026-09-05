import { TopRail } from "@/components/layout/TopRail";
import { TodoList } from "@/components/todos/TodoList";

export default function TodosPage() {
  return (
    <>
      <TopRail />
      <main className="pt-[52px] min-h-screen">
        <div className="page-padding max-w-[1280px] mx-auto py-12">
          <div className="mb-8">
            <h1 className="text-[22px] font-semibold text-[var(--text)] tracking-[-0.01em]">
              To-do
            </h1>
            <p className="text-[13px] text-[var(--text-muted)] mt-1">
              Tasks for today
            </p>
          </div>

          <TodoList />
        </div>
      </main>
    </>
  );
}

import { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import type { Task } from "./types";

type Filter = "all" | "completed" | "pending";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setFilter("all"); // 🔥 important fix
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (id: number, title: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 text-white">
        <h1 className="text-2xl font-bold text-center mb-4">⚡ Task Manager</h1>

        <TaskInput onAdd={addTask} />

        {/* Filters */}
        <div className="flex justify-center gap-2 my-4">
          {["all", "completed", "pending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as Filter)}
              className={`px-3 py-1 rounded-full text-sm transition ${
                filter === f
                  ? "bg-blue-500 text-white"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />

        {/* Progress */}
        <div className="mt-4">
          <div className="h-2 bg-white/20 rounded-full">
            <div
              className="h-2 bg-green-400 rounded-full"
              style={{
                width: `${
                  tasks.length ? (completedCount / tasks.length) * 100 : 0
                }%`,
              }}
            ></div>
          </div>

          <p className="text-xs text-center mt-2 text-gray-300">
            {completedCount} / {tasks.length} completed
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

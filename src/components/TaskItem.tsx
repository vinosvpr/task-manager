import { useState } from "react";
import type { Task } from "../types";

type Props = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
};

function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  const handleSave = () => {
    if (!value.trim()) return;
    onEdit(task.id, value);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between bg-white/10 p-3 rounded-lg mb-3 hover:bg-white/20 transition-transform hover:scale-[1.02]">
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="accent-green-400"
        />

        {isEditing ? (
          <input
            className="flex-1 px-2 py-1 rounded bg-white/20 text-white"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <span
            className={`flex-1 ${
              task.completed ? "line-through text-gray-400" : "text-white"
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex gap-2 ml-2">
        {isEditing ? (
          <button className="text-green-400" onClick={handleSave}>
            ✔
          </button>
        ) : (
          <button className="text-blue-400" onClick={() => setIsEditing(true)}>
            ✏
          </button>
        )}

        <button className="text-red-400" onClick={() => onDelete(task.id)}>
          ✖
        </button>
      </div>
    </li>
  );
}

export default TaskItem;

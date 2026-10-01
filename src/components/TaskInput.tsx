import { useState } from "react";

type Props = {
  onAdd: (title: string) => void;
};

function TaskInput({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleAdd} className="flex gap-2 w-full">
      <input
        className="flex-1 px-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
      />

      <button
        type="submit"
        className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition whitespace-nowrap"
      >
        Add
      </button>
    </form>
  );
}

export default TaskInput;

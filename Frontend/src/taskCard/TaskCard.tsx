import type { Task } from "../App";
import "./TaskCard.css";

type Props = {
  task: Task;
  deleteTask: (id: number) => void;
  toggleTask: (task: Task) => void;
};

function TaskCard({ task, deleteTask, toggleTask }: Props) {
  const handleToggle = () => toggleTask(task);
  const handleDelete = () => deleteTask(task.id);

  return (
    <li className={`task-card ${task.completed ? "completed" : ""}`}>
      <label className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
        />

        <span className="task-text">
          {task.title}
        </span>

        {task.completed && <span className="status-badge">Completado</span>}

      </label>

      <button
        className="delete-btn"
        onClick={handleDelete}
        aria-label="Eliminar"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M6 6l1 14h10l1-14" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>
    </li>
  );
}

export default TaskCard;
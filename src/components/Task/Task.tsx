import styles from "./Task.module.css";

import { Trash2 } from "lucide-react";

interface TaskProps {
  task: {
    id: string;
    name: string;
    isChecked: boolean;
  };
  toggleTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
}

export function Task({ task, toggleTask, handleDeleteTask }: TaskProps) {
  return (
    <li className={styles.task}>
      <div className={styles.taskInfo}>
        <input
          onClick={() => toggleTask(task.id)}
          type="checkbox"
          className={styles.checkbox}
        />
        <span
          style={
            task.isChecked ? { textDecoration: "line-through" } : undefined
          }
        >
          {task.name}
        </span>
      </div>

      <div>
        <button onClick={() => handleDeleteTask(task.id)}>
          <Trash2 size={22} />
        </button>
      </div>
    </li>
  );
}

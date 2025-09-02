import { useState, type FormEvent, type ChangeEvent, type FormEventHandler } from "react";
import { Task } from "../Task/Task";
import styles from "./Main.module.css";
import { CirclePlus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Clipboard from "../../assets/Clipboard.svg"
import {useForm} from "react-hook-form"

type TaskProp = {
  id: string;
  name: string;
  isChecked: boolean;
};

type FormData = {
  task : string
}




export function Main() {
  const [tasks, setTasks] = useState<TaskProp[]>([]);

  const {handleSubmit, watch, register, resetField} = useForm<FormData>()


  const [isChecked] = useState(false);

  const tasksCount = tasks.length;

  const tasksDone = tasks.filter((task) => task.isChecked === true);

  const tasksDoneCount = tasksDone.length;

 const task = watch("task")
 const isSubmitDisabled = !task

  function toggleTask(idTask: string) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === idTask ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  }

  function submit(data : FormData) {
    
    const newTask : TaskProp = {
      id : uuidv4(),
      name : data.task,
      isChecked : false

    }
    

    setTasks([...tasks, newTask]);
    console.log(tasks)
    resetField("task")
    
  }

  function handleDeleteTask(id: string) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  return (
    <main className={styles.main}>
      <div className={styles.tasks}>
        <form onSubmit={handleSubmit(submit)} className={styles.newTask}>
          <input
            type="text"
            id="task"
            placeholder="Adicione uma nova tarefa"
            {...register("task")}
          />

          <button disabled = {isSubmitDisabled} onClick={handleSubmit(submit)} className={styles.buttonCreate}>
            <span>Criar</span>
            <CirclePlus />
          </button>
        </form>

        <div className={styles.info}>
          <div className={styles.tasksCreated}>
            <span className={styles.tasksInfo}>Tarefas criadas</span>
            <span className={styles.tasksCount}>{tasksCount}</span>
          </div>

          <div className={styles.tasksFinished}>
            <span className={styles.done}>Concluidas</span>

            <span className={styles.doneCount}>
              {`${tasksDoneCount} de ${tasksCount}`}
            </span>
          </div>
        </div>

        {tasks.length > 0 ? <ul className={styles.tasksList}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </ul> : 
        <div className={styles.alternative}>
          <img src={Clipboard} alt="" />
          <div>
            <span>
            Você ainda não tem tarefas cadastradas
            
          </span>
          <span>
            Crie tarefas e organize seus itens a fazer
          </span>

          </div>
          
        </div>}

        
      </div>
    </main>
  );
}

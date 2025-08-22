import styles from "./Main.module.css"
import { CirclePlus } from "lucide-react"



export function Main() {
    return <main className={styles.main}>

        <div className={styles.tasks}>


            <div className={styles.newTask}>
                <input type="text" placeholder="Adicione uma nova tarefa" />

                <button className={styles.buttonCreate}>
                    <span>Criar</span><CirclePlus/>
                </button>
            </div>






            <div className={styles.info}>
                <div className={styles.tasksCreated}>
                    <span>
                        Tarefas criadas
                    </span>

                </div>

                <div className={styles.tasksFinished}>
                    <span>
                        Concluidas
                    </span>

                </div>

            </div>

        </div>

    </main>
}
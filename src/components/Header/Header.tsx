
import styles from "./Header.module.css"
import Rocket from "../../assets/rocket.svg"
import Todo from "../../assets/todo.svg"

export function Header() {
    return <header className={styles.header}>
            <img className={styles.rocket} src={Rocket} alt="Imagem do foguete"/>
            <img className={styles.todo} src={Todo} alt="Imagem do Todo" />
            
    </header>
}
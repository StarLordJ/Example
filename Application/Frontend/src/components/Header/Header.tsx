import * as React from "react";
import { Link } from "react-router-dom";

import styles from "./style.less"

export function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <Link className={styles.headerLink} to="/updatingA"><div>Редактирование А</div></Link>
                <Link className={styles.headerLink} to="/updatingB"><div>Редактирование Б</div></Link>
                <Link className={styles.headerLink} to="/showA"><div>Показать А</div></Link>
                <Link className={styles.headerLink} to="/showB"><div>Показать Б</div></Link>
                <Link className={styles.headerLink} to="/showC"><div>Показать С</div></Link>
            </div>
        </div>
    )
}

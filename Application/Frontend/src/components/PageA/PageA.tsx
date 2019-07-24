import * as React from "react";
import { PageForm } from "./Form";
import { Table } from "../Table";

import styles from "./style.less"

export function PageA() {
    return (
        <div className={styles.container}>
            <PageForm tableName={"TableA"} />
            <Table tableName={"TableA"} />
        </div>
    )
}

import React from "react";
import { PageA } from "../PageA";
import { PageB } from "../PageB";
import { Header } from "../Header"
import { Router, Route } from "react-router";
import { createHashHistory } from "history";

export function App() {
    return (
        <Router history={createHashHistory()}>
            <Header />
            <Route exact path="/updatingA" component={PageA} />
            <Route path="/updatingB" component={PageB} />
            <Route path="/showA" component={PageA} />
            <Route path="/showB" component={PageB} />
            <Route path="/showC" component={PageB} />
        </Router>
    )
}

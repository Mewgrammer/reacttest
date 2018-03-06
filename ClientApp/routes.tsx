import * as React from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Demo/Layout";
import { Home } from "./components/Demo/Home";
import { FetchData } from "./components/Demo/FetchData";
import { Counter } from "./components/Demo/Counter";
import { App } from "./components/App";

export const routes =(
    <Layout>
        <Route exact path="/" component={ Home } />
        <Route path="/counter" component={ Counter } />
        <Route path="/fetchdata" component={FetchData} />
        <Route path="/app" component={App} />
    </Layout>
);

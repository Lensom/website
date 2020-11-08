import React from 'react';
import classes from './Styles.module.scss';
import Header from 'components/Header';
import Main from 'pages/main';
import About from 'pages/about';
import Projects from 'pages/projects';
import Contact from 'pages/contact';
import { Switch, Route } from "react-router-dom";

const App = () => (
    <>
      <Header />
      <Switch>
        <Route path="/" exact  component={Main} />
        <Route path="/about"  component={About} />
        <Route path="/projects"  component={Projects} />
        <Route path="/contact"  component={Contact} />
      </Switch>
    </>
)

export default App;

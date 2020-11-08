import React from 'react';
import Main from 'pages/main';
import About from 'pages/about';
import Projects from 'pages/projects';
import Contact from 'pages/contact';
import { Switch, Route } from "react-router-dom";

const App = () => (
  <Switch>
    <Route path="/" exact component={Main} />
    <Route path="/about"  component={About} />
    <Route path="/projects"  component={Projects} />
    <Route path="/contact"  component={Contact} />
  </Switch>
)

export default App;

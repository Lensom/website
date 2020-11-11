import React from 'react';
import Main from 'pages/main';
import About from 'pages/about';
import Projects from 'pages/projects';
import Contact from 'pages/contact';
import Header from 'components/Header';
import Footer from 'components/Footer';
import AnimatedCursor from 'utils/AnimatedCursor';
import {
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const App = withRouter(({ location }) => (
  <>
    <Header />
    <AnimatedCursor />
    <TransitionGroup style={{height: '100vh'}}>
      <CSSTransition key={location.key} classNames="slide" timeout={1000}>
        <Switch location={location}>
          <Route path="/" exact component={Main} />
          <Route path="/about"  component={About} />
          <Route path="/projects"  component={Projects} />
          <Route path="/contact"  component={Contact} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
    <Footer />
  </>
));

export default App;

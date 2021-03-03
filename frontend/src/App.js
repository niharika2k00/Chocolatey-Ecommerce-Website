
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HEAD from './Components/Header.js';
import FOOT from './Components/Footer.js';
import INTROSCREEN from './Screens/Introscreen.js';
import HOMESCREEN from './Screens/Homescreen.js';
import PRODUCTSCREEN from './Screens/Productscreen.js';
import CARTSCREEN from './Screens/Cartscreen.js';

function App() {
  return (
    <Router>
      <div className="App">
        <HEAD />
        <main>
          <Container>
            {/* <Route path='/intro' component={INTROSCREEN} exact /> */}
            <Route path='/home' component={HOMESCREEN} exact />
            <Route path='/product/:id' component={PRODUCTSCREEN} />
            <Route path='/cart/:id?' component={CARTSCREEN} />
            {/* <HOMESCREEN/> */}
            {/* <h1>WELCOME TO ECOMMERCE</h1> */}
          </Container>
          <Route path='/' component={INTROSCREEN} exact />
        </main>
        <FOOT />
      </div>
    </Router>

  );
}

export default App;

// Container tag helps to add a broad margin around 
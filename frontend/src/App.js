
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './index.css';
import NAVIGATION_BAR from './Components/Header.js';
import FOOT from './Components/Footer.js';
import INTROSCREEN from './Screens/Introscreen.js';
import HOMESCREEN from './Screens/Homescreen.js';
import PRODUCTSCREEN from './Screens/Productscreen.js';
import CARTSCREEN from './Screens/Cartscreen.js';
import LOGINSCREEN from './Screens/LoginScreen.js';
import REGISTERSCREEN from './Screens/RegisterScreen.js';
import PROFILESCREEN from './Screens/ProfileScreen.js';
import SHIPPINGSCREEN from './Screens/ShippingScreen.js';
import PAYMENTSCREEN from './Screens/PaymentScreen.js';
import PLACEORDERSCREEN from './Screens/PlaceOrderScreen.js';
import ORDER_SCREEN from './Screens/OrderScreen.js';






function App() {

  const [filling, setFilling] = useState("None");

  return (
    <Router>
      <div className="App" style={{ backgroundColor: "#222022ef"  /*  "#0a9396" */ }}>
        <NAVIGATION_BAR />

        <main >
          <div className="self_containerFull">
            {/* <Route path='/intro' component={INTROSCREEN} exact /> */}
            <Route path='/order/:id' component={ORDER_SCREEN} />
            <Route path='/placeorder' component={PLACEORDERSCREEN} />
            <Route path='/payment' component={PAYMENTSCREEN} />
            <Route path='/shipping' component={SHIPPINGSCREEN} />
            <Route path='/profile' component={PROFILESCREEN} />
            {/* <Route path='/cart/:id?' component={CARTSCREEN} /> */}
            {/* <Route path='/product/:id' component={PRODUCTSCREEN} /> */}

            <Route path='/cart/:id?'
              render={(props) => (
                <CARTSCREEN {...props}
                  filling={filling}
                />
              )}
            />

            <Route path='/product/:id'
              render={(props) => (
                <PRODUCTSCREEN {...props}
                  filling={filling}
                  setFilling={setFilling}
                />
              )}
            />

            <Route path='/register' component={REGISTERSCREEN} />
            <Route path='/login' component={LOGINSCREEN} />
            <Route path='/home' component={HOMESCREEN} exact />
          </div>

          <Route path='/' component={INTROSCREEN} exact />
        </main>



        <FOOT />
      </div>
    </Router>

  );
}

export default App;

// Container tag helps to add a broad margin around 
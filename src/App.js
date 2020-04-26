import React from "react";
import Groups from "./containers/Groups/Groups";
import Login from './containers/Login/Login'
import Navbar from './hoc/Layout/Layout'
import Register from './containers/Register/Register'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import NotificationContainer from 'react-notifications'
import 'react-notifications-component/dist/theme.css'

function App() {

  return (
    <Router>
    <div>
      <Navbar></Navbar>
        <Switch>
          <Route path="/groups">
            <div>
             <Groups></Groups>
            </div>
          </Route>
          <Route path="/login">
            <div>
              <Login></Login>
            </div>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route path="/">
            {/* <InitialPage></InitialPage> */}
          </Route>
        </Switch>
    </div>
    </Router>
    // <div>
    //
    //     <div className={document.URL.includes('groups')? classes.activeGroups : classes.inactive}>
    //       <Groups></Groups>
    //     </div>
    //   </Layout>
    // </div>
  );
}

export default App;

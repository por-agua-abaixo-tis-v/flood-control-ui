import React from "react";
import Groups from "./containers/Groups/Groups";
import Login from './containers/Login/Login'
import Navbar from './hoc/Layout/Layout'
import Register from './containers/Register/Register'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import NotificationSystem from 'react-notification-system';

function App() {
  let notificationSystem = React.createRef();
  const addNotification = (config) => {
    const notification = notificationSystem.current;
    notification.addNotification({
      title: config.title,
      message: config.msg,
      level: config.type,
      action: config.action
    });
  };
  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <Switch>
          <Route path="/groups">
            <div>
              <Groups notification={addNotification} ></Groups>
            </div>
          </Route>
          <Route path="/login">
            <div>
              <Login notification={addNotification} ></Login>
            </div>
          </Route>
          <Route path="/register">
            <Register notification={addNotification} ></Register>
          </Route>
          <Route path="/">
            {/* <InitialPage></InitialPage> */}
          </Route>
        </Switch>
      </div>
      <NotificationSystem ref={notificationSystem} />
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

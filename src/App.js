import React from "react";
import Groups from "./containers/Groups/Groups";
import AdminGroups from "./containers/GroupsAdmin/Groups";
import Login from './containers/Login/Login'
import Navbar from './hoc/Layout/Layout'
import Register from './containers/Register/Register'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import NotificationSystem from 'react-notification-system';
import CreateGroups from './containers/CreateGroup/CreateGroup'
import classes from './App.css'
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
      <div className={classes.chatcontainer}>
        <Navbar></Navbar>
        <div>
          <Switch >
          <Route exact path="/groups">
              <Groups notification={addNotification} ></Groups>
          </Route>
          <Route exact path="/groups/admin">
              <AdminGroups notification={addNotification} ></AdminGroups>
          </Route>
          <Route path="/login">
              <Login notification={addNotification} ></Login>
          </Route>
          <Route path="/register">
            <Register notification={addNotification} ></Register>
          </Route>
          <Route path="/groups/create">
            <CreateGroups notification={addNotification} ></CreateGroups>
          </Route>
          <Route path="/">
            {localStorage.getItem('id')? <Redirect to="/groups" />:<Redirect to="/login" />}
          </Route>
        </Switch>
        </div>
      <NotificationSystem ref={notificationSystem} />
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

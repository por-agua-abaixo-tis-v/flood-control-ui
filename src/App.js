import React from "react";
import Layout from "./hoc/Layout/Layout"
import Groups from "./containers/Groups/Groups";
import classes from './hoc/Layout/Layout.css'
function App() {
  return (
    <div>
      <Layout className={classes.chatLayout}>
        <div className={document.URL.includes('groups')? classes.activeGroups : classes.inactive}>
          <Groups></Groups>
        </div>
      </Layout>
    </div>
  );
}

export default App;

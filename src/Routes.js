import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserChapterList from "./user/chapter/UserChapterList";
// import UserAppointmentList from "./user/appointment/UserAppointmentList";
import ChapterList from "./admin/chapter/ChapterList";
import UserList from "./admin/users/UserList";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        {/* <Route path="/profile" exact component={Profile} /> */}
        <PrivateRoute path="/user/chapter/list" exact component={UserChapterList} />

        <PrivateRoute path="/admin/user/list" exact component={UserList} />
        <PrivateRoute path="/admin/chapter/list" exact component={ChapterList} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

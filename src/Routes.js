import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDoctorList from "./user/doctor/UserDoctorList";
import UserAppointmentList from "./user/appointment/UserAppointmentList";
import AdminDoctorList from "./admin/doctor/DoctorList";
import AdminAppointmentList from "./admin/appointment/AdminAppointmentList";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        {/* <Route path="/profile" exact component={Profile} /> */}
        <PrivateRoute path="/user/doctor/list" exact component={UserDoctorList} />
        <PrivateRoute path="/user/appointment/list" exact component={UserAppointmentList} />

        <PrivateRoute path="/admin/doctor/list" exact component={AdminDoctorList} />
        <PrivateRoute path="/admin/appointment/:id" exact component={AdminAppointmentList} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

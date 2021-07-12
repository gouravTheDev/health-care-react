import React, { useState, useEffect } from "react";
import Base from "../../core/Base";
import { Modal, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import UserApi from "../helper/userapicalls";

import moment from "moment";

const cookies = new Cookies();

const UserJobApplicationList = () => {
  // State Variables
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [token, setToken] = useState("");
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [resume, setResume] = useState("");

  // Handling Changes

  async function fetchAppointmentList() {
    try {
      let token = cookies.get("token");
      setToken(token);
      let response = await UserApi.appointmentList(token);
      console.log(response);
      setAppointments(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // Use Effect Method

  useEffect(() => {
    fetchAppointmentList();
  }, []);


  return (
    <Base title="My Appointments">
      <div className="row">
        <div className="col-10 mx-auto card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Doctor</th>
                    <th scope="col">Fees</th>
                    <th scope="col">Apt. Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length>0 ? appointments.map((appo) => (
                    <tr key={appo._id}>
                      <td>{appo.doctor.title}</td>
                      <td>{appo.doctor.fees}</td>
                      <td>{moment(appo.date).format("DD/MM/YYYY")}</td>
                      <td>
                        {appo.app_status == "pending" && (
                          <span className="badge badge-warning">Pending</span>
                        )}
                        {appo.app_status == "accepted" && (
                          <span className="badge badge-success">Accepted</span>
                        )}
                        {appo.app_status == "rejected" && (
                          <span className="badge badge-danger">Rejected</span>
                        )}
                      </td>
                    </tr>
                  )): (<div className="col-10 mx-auto"><div className="alert alert-warning">No appointment yet!</div></div>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default UserJobApplicationList;

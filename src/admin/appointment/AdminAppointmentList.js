import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Base from "../../core/Base";
import { Modal, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import UserApi from "../helper/userapicalls";
import { API } from "../../backend";

import moment from "moment";

const cookies = new Cookies();

const AdminAppointmentList = () => {
  // State Variables
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [token, setToken] = useState("");
  const [appointments, setDoctorAppointments] = useState([]);
  const [apiLink, setApiLink] = useState(API);
  const [msg, setMsg] = useState("");

  let { id } = useParams();

  const [doctorId, setdoctorId] = useState(id);

  async function fetchAppointments() {
    try {
      let token = cookies.get("token");
      setToken(token);
      let response = await UserApi.appointments(token, doctorId);
      console.log(response);
      if (response.status == 200) {
        setDoctorAppointments(response.data);
      } else {
        setDoctorAppointments([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Use Effect Method

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Execution Methods

  const acceptApplication = async (event, doctorId) => {
    let acceptApplication = await UserApi.updateAppointment(token, {
      id: doctorId,
      app_status: "accepted",
    });
    if (acceptApplication.status == 200) {
      setMsg("Appointment Accepted");
      setShowSuccessMsg(true);
    } else {
      return;
    }
    fetchAppointments();
  };

  const rejectApplication = async (event, doctorId) => {
    event.preventDefault();
    let rejectApplication = await UserApi.updateAppointment(token, {
      id: doctorId,
      app_status: "rejected",
    });
    if (rejectApplication.status == 200) {
      setMsg("Appointment Rejected");
      setShowSuccessMsg(true);
    } else {
      return;
    }
    fetchAppointments();
  };

  return (
    <Base title="Job Applications">
      <div className="row">
        {showSuccessMsg && (
          <div className="col-8 mx-auto">
            <div className="alert alert-warning text-center">{msg}</div>
          </div>
        )}
        <div className="col-10 mx-auto card shadow">
          <div className="card-body">
            {appointments.length > 0 && (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Doctor</th>
                      <th scope="col">User</th>
                      <th scope="col">User Email</th>
                      <th scope="col">Appt. Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {appointments.map((doctorApp) => (
                      <tr key={doctorApp._id}>
                        <td>{doctorApp.doctor.title}</td>
                        <td>{doctorApp.user.name}</td>
                        <td>{doctorApp.user.email}</td>
                        <td>{moment(doctorApp.date).format("DD/MM/YYYY")}</td>
                        <td>
                          {doctorApp.app_status == "pending" && (
                            <span className="badge badge-warning">Pending</span>
                          )}
                          {doctorApp.app_status == "accepted" && (
                            <span className="badge badge-success">Accepted</span>
                          )}
                          {doctorApp.app_status == "rejected" && (
                            <span className="badge badge-danger">Rejected</span>
                          )}
                        </td>
                        <td>
                          {doctorApp.app_status == "pending" && (
                            <div className="btn-group">
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() =>
                                  acceptApplication(this, doctorApp._id)
                                }
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  rejectApplication(this, doctorApp._id)
                                }
                              >
                                Reject
                              </button>
                            </div>
                          )}
                          {doctorApp.app_status != "pending" && (
                            <div className="btn-group">
                              <button
                                className="btn btn-sm btn-primary"
                                disabled={true}
                              >
                                Select
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                disabled={true}
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {appointments.length == 0 && (
              <div className="alert alert-warning">No appointment yet!</div>
            )}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AdminAppointmentList;

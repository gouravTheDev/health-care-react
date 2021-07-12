import React, { useState, useEffect } from "react";
import Base from "../../core/Base";
import { Modal, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import UserApi from "../helper/userapicalls";

import moment from "moment";

const cookies = new Cookies();

const JobList = () => {
  // State Variables
  const [showDoctorDetails, setShowDoctorDetails] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [token, setToken] = useState("");
  const [doctorDetails, setDoctorDetails] = useState({});
  const [doctors, setDoctors] = useState([]);

  const [appointment, setAppointment] = useState({
    date: "",
    details: "",
    doctor: ""
  });

  // Handling Changes

  const handleClose = () => setShowDoctorDetails(false);

  const handleShowDoctorDetails = async (docId) => {
    setShowDoctorDetails(true);
    doctors.map((doc) => {
      if (doc._id.toString() == docId.toString()) {
        setDoctorDetails(doc);
        setAppointment({ ...appointment, doctor: docId });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setAppointment({ ...appointment, [name]: event.target.value });
  };

  async function fetchDoctorList() {
    try {
      let token = cookies.get("token");
      setToken(token);
      let response = await UserApi.doctorList(token);
      setDoctors(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // Use Effect Method

  useEffect(() => {
    fetchDoctorList();
  }, []);

  // Execution Methods

  const makeAppointment = async (event) => {
    console.log(appointment)
    event.preventDefault();
    if (appointment.details == "" || appointment.date == "") {
      return;
    }
    let makeAppointment = await UserApi.makeAppointment(token, appointment);
    console.log(makeAppointment)
    if (makeAppointment.status == 200) {
      setShowSuccessMsg(true);
    } else {
      return;
    }
    fetchDoctorList();
    handleClose();
  };

  return (
    <Base title="All doctors">
      <div className="row">
        {showSuccessMsg && (
          <div className="col-8 mx-auto">
            <div className="alert alert-success text-center">
              You have successfully booked the appointment!
            </div>
          </div>
        )}
        {doctors.map((doctor) => (
          <div key={doctor._id} className="col-md-6 col-sm-12 mb-3 mx-auto">
            <div className="card-cus shadow">
              <div className="card-body">
                <h4
                  style={{ color: "#000" }}
                  className="text-center font-weight-bold"
                >
                  Doctor: {doctor.title}
                </h4>
                <div className="text-center">
                  <h5>Fees:- {doctor.fees}</h5>
                </div>
                <div className="text-center text-justify mt-3">
                  <h5> {doctor.speciality} </h5>
                </div>
                <div className="row">
                  <div
                    className="col-6 text-left"
                    style={{
                      position: "",
                      bottom: "2px",
                      right: "5px",
                    }}
                  >
                    <div
                      className="pt-4 pl-1"
                      style={{ bottom: "2px", right: "30px" }}
                    >
                      <span style={{ color: "#9E9EA1" }}>
                        Created On:- {moment(doctor.createdAt).format("DD/MM/YYYY")}
                      </span>
                    </div>
                  </div>
                  <div className="col-6 text-right pt-2">
                    {!doctor.isBooked ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleShowDoctorDetails(doctor._id)}
                        style={{ cursor: "pointer" }}
                      >
                        Make Appointment
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        disabled={true}
                        style={{ cursor: "not-allowed" }}
                      >
                        Appointment Taken
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*  Modal Starts */}
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showDoctorDetails}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Doctor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Doctor Name:- {doctorDetails.title}</h6>
          <h6>Fees:- {doctorDetails.fees}</h6>
          <h6>Speciality:- {doctorDetails.speciality}</h6>
          <hr />
          <h5>Create Appointment</h5>
          <hr />
          <form>
            <div className="row">
              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>Select Date</label>
                <input
                  onChange={handleChange("date")}
                  value={appointment.date}
                  className="form-control"
                  type="date"
                  placeholder="Enter Appointment Date"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>Details</label>
                <input
                  onChange={handleChange("details")}
                  className="form-control"
                  type="text"
                  value={appointment.details}
                  placeholder="Enter Appointment Details"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto text-right">
                <button onClick={makeAppointment} className="btn btn-success">
                  Save
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* APply Job Modal Ends */}
    </Base>
  );
};

export default JobList;

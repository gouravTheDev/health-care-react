import React, { useState, useEffect } from "react";
import Base from "../../core/Base";
import { Modal, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import UserApi from "../helper/userapicalls";
import { Link } from "react-router-dom";

import moment from "moment";

const cookies = new Cookies();

const DoctorList = () => {
  // State Variables
  const [showDoctorCreate, setShowDoctorCreate] = useState(false);
  const [showDoctorEdit, setShowDoctorEdit] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [token, setToken] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [jobDetails, setDoctorDetails] = useState({});
  const [doctors, setDoctors] = useState([]);

  const [doctor, setDoctor] = useState({
    title: "",
    fees: "",
    speciality: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const [editDoctor, setEditDoctor] = useState({
    _id: "",
    title: "",
    fees: "",
    speciality: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  // Handling Changes

  const handleClose = () => setShowDoctorCreate(false);
  const handleCloseEdit = () => setShowDoctorEdit(false);

  const handleShowDoctorEdit = async (docId) => {
    setShowDoctorEdit(true);
    doctors.map((doctor) => {
      if (doctor._id.toString() == docId.toString()) {
        setEditDoctor(doctor);
      }
    });
  };

  const handleChange = (name) => (event) => {
    setDoctor({ ...doctor, [name]: event.target.value });
  };

  const handleChange2 = (name) => (event) => {
    setEditDoctor({ ...editDoctor, [name]: event.target.value });
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

  const createDoctor = async (event) => {
    event.preventDefault();
    if (doctor.title == "" || doctor.speciality == "" || doctor.fees == "") {
      return;
    }
    let createDoctor = await UserApi.createDoctor(token, doctor);
    console.log(createDoctor);
    if (createDoctor.status == 200) {
      setSuccessMsg("Doctor Record Created Successfully");
      setShowSuccessMsg(true);
    } else {
      return;
    }
    fetchDoctorList();
    handleClose();
  };

  const updateDoctor = async (event) => {
    console.log(editDoctor);
    event.preventDefault();
    if (editDoctor.title == "" || editDoctor.speciality == "" || editDoctor.fees == "") {
      return;
    }
    let updateDoctor = await UserApi.updateDoctor(token, editDoctor);
    console.log(updateDoctor);
    if (updateDoctor.status == 200) {
      setSuccessMsg("Record Updated Successfully");
      setShowSuccessMsg(true);
    } else {
      return;
    }
    fetchDoctorList();
    handleCloseEdit();
  };

  const deleteDoctor = async (event, id) => {
    if (window.confirm("Delete the Doctor?")) {
      let deleteDoctor = await UserApi.deleteDoctor(token, id);
      if (deleteDoctor.status == 200) {
        setSuccessMsg("Doctor Deleted Successfully");
        setShowSuccessMsg(true);
      } else {
        return;
      }
      fetchDoctorList();
    }
  };

  return (
    <Base title="Doctor List">
      <div className="row">
        <div className="col-12 text-center mb-3 mt-0">
          <button
            onClick={() => setShowDoctorCreate(true)}
            className="btn btn-warning shadow"
          >
            Add a new Doctor
          </button>
        </div>
        {showSuccessMsg && (
          <div className="col-8 mx-auto">
            <div className="alert alert-success text-center">{successMsg}</div>
          </div>
        )}
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor._id} className="col-md-6 col-sm-12 mb-3 mx-auto">
              <div className="card-cus shadow">
                <div className="card-body">
                  <h4
                    style={{ color: "#000" }}
                    className="text-center font-weight-bold"
                  >
                    {doctor.title}
                  </h4>
                  <div className="text-center">
                    <h5>Fees:- {doctor.fees}</h5>
                  </div>
                  <div className="text-center text-justify mt-3">
                    <h5>{doctor.speciality}</h5>
                  </div>
                  <div className="row">
                    <div
                      className="col-12 text-left"
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
                          Posted On:-{" "}
                          {moment(doctor.createdAt).format("DD/MM/YYYY")}
                        </span>
                      </div>
                    </div>
                    <div className="col-8 text-left pt-2">
                      <div className="btn-group">
                        <button
                          className="btn btn-info"
                          onClick={() => handleShowDoctorEdit(doctor._id)}
                          style={{ cursor: "pointer" }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteDoctor(this, doctor._id)}
                          style={{ cursor: "pointer" }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="col-4 text-right pt-2">
                      <Link
                        className="btn btn-primary"
                        style={{ cursor: "pointer" }}
                        to={"/admin/appointment/" + doctor._id}
                      >
                        Appointments
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-8 mx-auto">
            <div className="alert alert-warning">No record present</div>
          </div>
        )}
      </div>

      {/* Create Doctor Modal Starts */}
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showDoctorCreate}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>Doctor Name</label>
                <input
                  onChange={handleChange("title")}
                  className="form-control"
                  type="text"
                  value={doctor.title}
                  placeholder="Enter doctor name"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>Fees</label>
                <input
                  onChange={handleChange("fees")}
                  className="form-control"
                  type="number"
                  value={doctor.fees}
                  placeholder="Enter Fees"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>Doctor Speciality</label>
                <textarea
                  onChange={handleChange("speciality")}
                  value={doctor.speciality}
                  placeholder="Speciality"
                  rows="3"
                  columns="3"
                  className="form-control"
                ></textarea>
              </div>
              <div className="col-md-12 col-sm-12 mx-auto text-right">
                <button onClick={createDoctor} className="btn btn-success">
                  Save Details
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* Create Doctor Modal Ends */}

      {/* Edit Doctor Modal Starts */}
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showDoctorEdit}
        onHide={handleCloseEdit}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Doctor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>Doctor Name</label>
                <input
                  onChange={handleChange2("title")}
                  className="form-control"
                  type="text"
                  value={editDoctor.title}
                  placeholder="Enter doctor name"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>Fees</label>
                <input
                  onChange={handleChange2("fees")}
                  className="form-control"
                  type="number"
                  value={editDoctor.fees}
                  placeholder="Enter Fees"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>Doctor Speciality</label>
                <textarea
                  onChange={handleChange2("speciality")}
                  value={editDoctor.speciality}
                  placeholder="Speciality"
                  rows="3"
                  columns="3"
                  className="form-control"
                ></textarea>
              </div>
              <div className="col-md-12 col-sm-12 mx-auto text-right">
                <button onClick={updateDoctor} className="btn btn-success">
                  Update record
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* Create Job Modal Ends */}
    </Base>
  );
};

export default DoctorList;

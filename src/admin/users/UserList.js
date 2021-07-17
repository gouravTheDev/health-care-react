import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Base from "../../core/Base";
import { Modal, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import UserApi from "../helper/userapicalls";
import { API } from "../../backend";

import moment from "moment";

const cookies = new Cookies();

const UserList = () => {
  // State Variables
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showUserCreate, setShowUserCreate] = useState(false);
  const [token, setToken] = useState("");
  const [users, setUsers] = useState([]);
  const [apiLink, setApiLink] = useState(API);
  const [successMsg, setSuccessMsg] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const handleClose = () => setShowUserCreate(false);

  const handleChange = (name) => (event) => {
    setUser({ ...user, [name]: event.target.value });
  };

  async function fetchusers() {
    try {
      let token = cookies.get("token");
      setToken(token);
      let response = await UserApi.userList(token);
      console.log(response);
      if (response.status == 200) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Use Effect Method

  useEffect(() => {
    fetchusers();
  }, []);

  // Execution Methods

  const createUser = async (event) => {
    event.preventDefault();
    if (user.name == "" || user.email == "") {
      return;
    }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(user.email).toLowerCase())){
      return;
    }
    let createUser = await UserApi.createUser(token, user);
    console.log(createUser);
    if (createUser.status == 200) {
      setSuccessMsg("Employee Record Created Successfully");
      setShowSuccessMsg(true);
    } else {
      return;
    }
    fetchusers();
    handleClose();
  };

  return (
    <Base title="User List">
      <div className="row">
        <div className="col-12 text-center mb-3 mt-0">
          <button
            onClick={() => setShowUserCreate(true)}
            className="btn btn-warning shadow"
          >
            Add new Employee 
          </button>
        </div>
        {showSuccessMsg && (
          <div className="col-8 mx-auto">
            <div className="alert alert-warning text-center">{successMsg}</div>
          </div>
        )}
        <div className="col-10 mx-auto card shadow">
          <div className="card-body">
            {users.length > 0 && (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">User Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{moment(user.createdAt).format("DD/MM/YYYY")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {users.length == 0 && (
              <div className="alert alert-warning">No users yet!</div>
            )}
          </div>
        </div>
      </div>

      {/* Create User Modal Starts */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showUserCreate}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>User Name</label>
                <input
                  onChange={handleChange("name")}
                  className="form-control"
                  type="text"
                  value={user.name}
                  placeholder="Enter User name"
                />
              </div>

              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>User Email</label>
                <input
                  onChange={handleChange("email")}
                  className="form-control"
                  type="email"
                  value={user.email}
                  placeholder="Enter User email"
                />
              </div>

              <div className="col-md-12 col-sm-12 mx-auto text-right">
                <button onClick={createUser} className="btn btn-success">
                  Create
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* Create Chapter Modal Ends */}
    </Base>
  );
};

export default UserList;

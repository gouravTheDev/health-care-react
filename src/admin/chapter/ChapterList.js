import React, { useState, useEffect } from "react";
import Base from "../../core/Base";
import { Modal, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import UserApi from "../helper/userapicalls";
import { Link } from "react-router-dom";
import { API } from "../../backend";

import moment from "moment";

const cookies = new Cookies();

const ChapterList = () => {
  // State Variables
  const [showChapterCreate, setShowChapterCreate] = useState(false);
  const [showChapterEdit, setShowChapterEdit] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [token, setToken] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [chapterDetails, setChapterDetails] = useState({});
  const [apiLink, setApiLink] = useState(API);
  const [chapters, setchapters] = useState([]);

  const [chapter, setChapter] = useState({
    title: "",
    file: "",
    details: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const [editChapter, setEditChapter] = useState({
    _id: "",
    title: "",
    file: "",
    details: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  // Handling Changes

  const handleClose = () => setShowChapterCreate(false);
  const handleCloseEdit = () => setShowChapterEdit(false);

  const handleShowChapterEdit = async (chapterId) => {
    setShowChapterEdit(true);
    chapters.map((Chapter) => {
      if (Chapter._id.toString() == chapterId.toString()) {
        setEditChapter(Chapter);
      }
    });
  };

  const handleChange = (name) => (event) => {
    setChapter({ ...chapter, [name]: event.target.value });
  };

  const handleChange2 = (name) => (event) => {
    setEditChapter({ ...editChapter, [name]: event.target.value });
  };

  const handleFileChange = (name) => (event) => {
    setChapter({ ...chapter, file: event.target.files[0] });
  };

  const handleFileChange2 = (name) => (event) => {
    setEditChapter({ ...editChapter, file: event.target.files[0] });
  };

  async function fetchChapterList() {
    try {
      let token = cookies.get("token");
      setToken(token);
      let response = await UserApi.chapterList(token);
      setchapters(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // Use Effect Method

  useEffect(() => {
    fetchChapterList();
  }, []);

  // Execution Methods

  const createChapter = async (event) => {
    event.preventDefault();
    if (chapter.title == "" || chapter.speciality == "" || chapter.fees == "") {
      return;
    }
    let formData = new FormData();
    formData.set("title", chapter.title);
    formData.set("details", chapter.details);
    formData.set("file", chapter.file);
    let createChapter = await UserApi.createChapter(token, formData);
    console.log(createChapter);
    if (createChapter.status == 200) {
      setSuccessMsg("Chapter Record Created Successfully");
      setShowSuccessMsg(true);
    } else {
      return;
    }
    fetchChapterList();
    handleClose();
  };

  const updateChapter = async (event) => {
    console.log(editChapter);
    event.preventDefault();
    if (
      editChapter.title == "" ||
      editChapter.speciality == "" ||
      editChapter.fees == ""
    ) {
      return;
    }
    let formData = new FormData();
    formData.set("title", editChapter.title);
    formData.set("details", editChapter.details);
    formData.set("file", editChapter.file);
    formData.set("_id", editChapter._id);
    let updateChapter = await UserApi.updateChapter(token, formData);
    console.log(updateChapter);
    if (updateChapter.status == 200) {
      setSuccessMsg("Record Updated Successfully");
      setShowSuccessMsg(true);
    } else {
      return;
    }
    fetchChapterList();
    handleCloseEdit();
  };

  const deleteChapter = async (event, id) => {
    if (window.confirm("Delete the Chapter?")) {
      let deleteChapter = await UserApi.deleteChapter(token, id);
      if (deleteChapter.status == 200) {
        setSuccessMsg("Chapter Deleted Successfully");
        setShowSuccessMsg(true);
      } else {
        return;
      }
      fetchChapterList();
    }
  };

  return (
    <Base title="Chapter List">
      <div className="row">
        <div className="col-12 text-center mb-3 mt-0">
          <button
            onClick={() => setShowChapterCreate(true)}
            className="btn btn-warning shadow"
          >
            Add a new Chapter
          </button>
        </div>
        {showSuccessMsg && (
          <div className="col-8 mx-auto">
            <div className="alert alert-success text-center">{successMsg}</div>
          </div>
        )}
        {chapters.length > 0 ? (
          chapters.map((chapter) => (
            <div key={chapter._id} className="col-md-12 col-sm-12 mb-3 mx-auto">
              <div className="card-cus shadow">
                <div className="card-body">
                  <h4
                    style={{ color: "#000" }}
                    className="text-center font-weight-bold"
                  >
                    {chapter.title}
                  </h4>
                  <div className="text-center text-justify mt-3">
                    <h5>
                      <a
                        href={apiLink + "/uploads/chapter/" + chapter.file}
                        target="_blank"
                      >
                        Download File
                      </a>
                    </h5>
                  </div>
                  <div className="text-center text-justify">
                    <h5>Details:- {chapter.details}</h5>
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
                          Created On:-{" "}
                          {moment(chapter.createdAt).format("DD/MM/YYYY")}
                        </span>
                      </div>
                    </div>
                    <div className="col-6 text-right pt-2">
                      <div className="btn-group">
                        <button
                          className="btn btn-info"
                          onClick={() => handleShowChapterEdit(chapter._id)}
                          style={{ cursor: "pointer" }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteChapter(this, chapter._id)}
                          style={{ cursor: "pointer" }}
                        >
                          Delete
                        </button>
                      </div>
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

      {/* Create Chapter Modal Starts */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showChapterCreate}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Chapter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>Chapter Name</label>
                <input
                  onChange={handleChange("title")}
                  className="form-control"
                  type="text"
                  value={chapter.title}
                  placeholder="Enter Chapter name"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>Upload File</label>
                <input
                  onChange={handleFileChange(this)}
                  className="form-control"
                  type="file"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>Chapter Details</label>
                <textarea
                  onChange={handleChange("details")}
                  value={chapter.details}
                  placeholder="Chapter Content"
                  rows="10"
                  columns="3"
                  className="form-control"
                ></textarea>
              </div>
              <div className="col-md-12 col-sm-12 mx-auto text-right">
                <button onClick={createChapter} className="btn btn-success">
                  Create
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* Create Chapter Modal Ends */}

      {/* Edit Chapter Modal Starts */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showChapterEdit}
        onHide={handleCloseEdit}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Chapter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
            <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>Chapter Name</label>
                <input
                  onChange={handleChange2("title")}
                  className="form-control"
                  type="text"
                  value={editChapter.title}
                  placeholder="Enter Chapter name"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>Upload File</label>
                <input
                  onChange={handleFileChange2(this)}
                  className="form-control"
                  type="file"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3 form-group">
                <label>Chapter Details</label>
                <textarea
                  onChange={handleChange2("details")}
                  value={editChapter.details}
                  placeholder="Chapter Content"
                  rows="10"
                  columns="3"
                  className="form-control"
                ></textarea>
              </div>
              <div className="col-md-12 col-sm-12 mx-auto text-right">
                <button onClick={updateChapter} className="btn btn-success">
                  Update
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

export default ChapterList;

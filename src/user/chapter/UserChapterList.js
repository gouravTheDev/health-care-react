import React, { useState, useEffect } from "react";
import Base from "../../core/Base";
import { Modal, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import UserApi from "../helper/userapicalls";
import { Link } from "react-router-dom";
import { API } from "../../backend";

import moment from "moment";

const cookies = new Cookies();

const UserChapterList = () => {
  // State Variables
  const [token, setToken] = useState("");
  const [apiLink, setApiLink] = useState(API);
  const [chapters, setchapters] = useState([]);

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



  return (
    <Base title="Chapter List">
      <div className="row">
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
    </Base>
  );
};

export default UserChapterList;

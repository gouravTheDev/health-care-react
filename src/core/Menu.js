import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated, isAdmin } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const getResult = async () => {
      var admin = await isAdmin();
      setAdmin(admin);
    };

    getResult();
  }, []);
  return (
    <div>
      <ul
        className="nav nav-tabs bg-dark py-2 bg-transparent"
        style={{ borderBottom: "0px" }}
      >
        <a
          className="ml-3 navbar-brand btn btn-primary"
          href="#"
          style={{ borderRadius: "24px" }}
        >
          Employee Training
        </a>
        {!isAutheticated() && (
          <Fragment>
            <li className="nav-item ml-auto mr-4">
              <Link
                style={{
                  borderRadius: "30px",
                  background: "#F72D2D",
                  color: "#ffffff",
                  fontSize: "20px",
                  zIndex: "99999999",
                }}
                className="btn"
                to="/signin"
              >
                Login to Your Account
              </Link>
            </li>
          </Fragment>
        )}
        {isAutheticated() && !admin && (
          <Fragment>
            <li className="nav-item ml-auto mr-3">
              <Link
                className="btn"
                style={{ cursor: "pointer" }}
                style={{
                  borderRadius: "30px",
                  background: "#3C83E5",
                  color: "#ffffff",
                  fontSize: "20px",
                }}
                to="/user/chapter/list"
              >
                Chapters
              </Link>
            </li>
            <li className="nav-item mr-3">
              <span
                className="btn"
                style={{ cursor: "pointer" }}
                style={{
                  borderRadius: "30px",
                  background: "#3C83E5",
                  color: "#ffffff",
                  fontSize: "20px",
                }}
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </span>
            </li>
          </Fragment>
        )}
        {isAutheticated() && admin && (
          <Fragment>
            <li className="nav-item ml-auto mr-3">
              <Link
                className="btn"
                style={{ cursor: "pointer" }}
                style={{
                  borderRadius: "30px",
                  background: "#3C83E5",
                  color: "#ffffff",
                  fontSize: "20px",
                }}
                to="/admin/user/list"
              >
                Users
              </Link>
            </li>
            <li className="nav-item mr-3">
              <Link
                className="btn"
                style={{ cursor: "pointer" }}
                style={{
                  borderRadius: "30px",
                  background: "#3C83E5",
                  color: "#ffffff",
                  fontSize: "20px",
                }}
                to="/admin/chapter/list"
              >
                Chapters
              </Link>
            </li>
            <li className="nav-item mr-3">
              <span
                className="btn"
                style={{ cursor: "pointer" }}
                style={{
                  borderRadius: "30px",
                  background: "#3C83E5",
                  color: "#ffffff",
                  fontSize: "20px",
                }}
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </span>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);

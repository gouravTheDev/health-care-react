import { API } from "../../backend";

class UserApi {
  doctorList = async (token) => {
    try {
      let doctorList = await fetch(`${API}/doctor/list`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      });
      doctorList = await doctorList.json();
      return doctorList;
    } catch (error) {
      console.log(error);
    }
  };

  makeAppointment = async (token, data) => {
    try {
      let doctorAPpointment = await fetch(`${API}/appointment/save`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      });
      doctorAPpointment = await doctorAPpointment.json();
      return doctorAPpointment;
    } catch (error) {
      console.log(error);
    }
  };

  appointmentList = async (token) => {
    try {
      let appointmentList = await fetch(`${API}/appointment/my-list`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      });
      appointmentList = await appointmentList.json();
      return appointmentList;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new UserApi();

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

  appointments = async (token, doctorId) => {
    try {
      let doctorAppointments = await fetch(`${API}/appointment/doctor/${doctorId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      });
      doctorAppointments = await doctorAppointments.json();
      return doctorAppointments;
    } catch (error) {
      console.log(error);
    }
  };

  updateAppointment = async (token, data) => {
    try {
      let jobApplicationRecord = await fetch(`${API}/appointment/update`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      });
      jobApplicationRecord = await jobApplicationRecord.json();
      return jobApplicationRecord;
    } catch (error) {
      console.log(error);
    }
  };

  createDoctor = async (token, data) => {
    try {
      let doctorData = await fetch(`${API}/doctor/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      });
      doctorData = await doctorData.json();
      console.log(doctorData);
      return doctorData;
    } catch (error) {
      console.log(error);
    }
  };

  updateDoctor = async (token, data) => {
    try {
      let updateDoctor = await fetch(`${API}/doctor/update`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      });
      updateDoctor = await updateDoctor.json();
      return updateDoctor;
    } catch (error) {
      console.log(error);
    }
  };

  deleteDoctor = async (token, id) => {
    try {
      let updateJob = await fetch(`${API}/doctor/delete`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({id: id}),
      });
      updateJob = await updateJob.json();
      return updateJob;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new UserApi();

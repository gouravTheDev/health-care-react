import { API } from "../../backend";

class UserApi {
  chapterList = async (token) => {
    try {
      let chapterList = await fetch(`${API}/chapter/list`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      });
      chapterList = await chapterList.json();
      return chapterList;
    } catch (error) {
      console.log(error);
    }
  };

  userList = async (token) => {
    try {
      let userList = await fetch(`${API}/user/list`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      });
      userList = await userList.json();
      return userList;
    } catch (error) {
      console.log(error);
    }
  };

  createUser = async (token, data) => {
    try {
      let createUser = await fetch(`${API}/user/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      });
      createUser = await createUser.json();
      console.log(createUser);
      return createUser;
    } catch (error) {
      console.log(error);
    }
  };

  createChapter = async (token, data) => {
    try {
      let createChapter = await fetch(`${API}/chapter/create`, {
        method: "POST",
        headers: {
          token: token,
        },
        body: data,
      });
      createChapter = await createChapter.json();
      console.log(createChapter);
      return createChapter;
    } catch (error) {
      console.log(error);
    }
  };

  updateChapter = async (token, data) => {
    try {
      let updateChapter = await fetch(`${API}/chapter/update`, {
        method: "POST",
        headers: {
          token: token,
        },
        body: data,
      });
      updateChapter = await updateChapter.json();
      return updateChapter;
    } catch (error) {
      console.log(error);
    }
  };

  deleteChapter = async (token, id) => {
    try {
      let updateChapter = await fetch(`${API}/chapter/delete`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({id: id}),
      });
      updateChapter = await updateChapter.json();
      return updateChapter;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new UserApi();

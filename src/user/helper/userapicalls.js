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

}

export default new UserApi();

import axios from "axios";

const HEADER = 'application/json';
/* ▼ 인텔리제이용 ▼ */
export const TEAM_DOMAIN = "http://localhost:8282/";
/* ▼ 이클립스용 ▼ */
// export const TEAM_DOMAIN = "http://localhost:8111/ISOUR/";/

const AdminAPI = {

  /* 전체 회원 조회 @GetMapping("/GetAllMember") */
  getAllMember: async function () {
    // return await axios.get(TEAM_DOMAIN + "GetAllMember", HEADER);
    return await axios.get("GetAllMember", HEADER);
  },

  /* 로그인 @PostMapping("/AdminLogin") */
  adminLogin: async function (id, pwd) {
    const loginObj = {
      id: id,
      pwd: pwd
    }
    // return await axios.post(TEAM_DOMAIN + "AdminLogin", loginObj, HEADER);
    return await axios.post("AdminLogin", loginObj, HEADER);
  },

  /* 쪽지함 조회 @GetMapping("/GetAllPostbox") */
  postbox: async function () {
    // return await axios.get(TEAM_DOMAIN + "GetAllPostbox", HEADER);
    return await axios.get("GetAllPostbox", HEADER);
  },

}

export default AdminAPI;
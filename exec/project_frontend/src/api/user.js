import http from "./axios.js";

/* �α��� */
function login(userinput, success, fail) {
  const user = {
    email: userinput.id,
    pwd: userinput.password,
  };
  http.post("user/login", JSON.stringify(user)).then(success).catch(fail);
}

async function findById(success, fail) {
  http.defaults.headers["X-AUTH-TOKEN"] = window.sessionStorage.getItem(
    "X-AUTH-TOKEN"
  );
  await http.get(`/user/info`).then(success).catch(fail);
}
/* ȸ������ */
function joinUser(user) {
  return http.post(`user/join`, user);
}
/* �ߺ� idüũ */
function checkId(email) {
  return http.get(`user/idcheck/${email}`);
}

/* �ߺ� �г���üũ */
function checkNickName(nickname) {
  return http.get(`user/nickcheck/${nickname}`);
}

/* �� ���� ��� */
function getMyInfo() {
  return http.get(`user/info/`);
}

/* ��й�ȣ ���� */
function changePassword(email, newPwd, nickname) {
  return http.put(`user/modify`, { email: email, pwd: newPwd, nick: nickname });
}
/* �� ���� ���� */
function updateUser(id, email, pwd, nickname) {
  return http.put(`user/modify`, {
    id: id,
    email: email,
    pwd: pwd,
    nick: nickname,
  });
}
/* Ż�� �ϱ� */
function deleteUser() {
  return http.delete(`user/delete`);
}

/* ��������Ʈ �������� */
function getMyList(page, size) {
  return http.get(`post/mylist/${page}/${size}`);
}
export {
  login,
  findById,
  joinUser,
  checkId,
  checkNickName,
  getMyInfo,
  changePassword,
  updateUser,
  deleteUser,
  getMyList,
};

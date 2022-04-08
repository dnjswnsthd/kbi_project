import ROUTER from "@/router";

/* ���� �������� �̵� */
function moveStart() {
  return ROUTER.push({ name: "Start" });
}

/* �α��� �������� �̵� */
function moveLogin() {
  return ROUTER.push({ name: "Login" });
}

/* ȸ������ �������� �̵� */
function moveSignUp() {
  return ROUTER.push({ name: "SignUp" });
}

/* ���� �������� �̵� */
function moveMain() {
  return ROUTER.push({ name: "Main" });
}

/* ���� �������� �̵� */
function moveMyPage() {
  return ROUTER.push({ name: "MyPage" });
}

export { moveLogin, moveSignUp, moveStart, moveMain, moveMyPage };

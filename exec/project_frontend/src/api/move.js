import ROUTER from "@/router";

/* 시작 페이지로 이동 */
function moveStart() {
  return ROUTER.push({ name: "Start" });
}

/* 로그인 페이지로 이동 */
function moveLogin() {
  return ROUTER.push({ name: "Login" });
}

/* 회원가입 페이지로 이동 */
function moveSignUp() {
  return ROUTER.push({ name: "SignUp" });
}

/* 메인 페이지로 이동 */
function moveMain() {
  return ROUTER.push({ name: "Main" });
}

/* 마이 페이지로 이동 */
function moveMyPage() {
  return ROUTER.push({ name: "MyPage" });
}

export { moveLogin, moveSignUp, moveStart, moveMain, moveMyPage };

import ROUTER from "@/router";

function moveStart() {
  return ROUTER.push({ name: "Start" });
}

function moveLogin() {
  return ROUTER.push({ name: "Login" });
}

function moveSignUp() {
  return ROUTER.push({ name: "SignUp" });
}

function moveMain() {
  return ROUTER.push({ name: "Main" });
}

function moveMyPage() {
  return ROUTER.push({ name: "MyPage" });
}

function moveCoinTrade() {
  return ROUTER.push({ name: "coinTrade" });
}

export {
  moveLogin,
  moveSignUp,
  moveStart,
  moveMain,
  moveMyPage,
  moveCoinTrade,
};

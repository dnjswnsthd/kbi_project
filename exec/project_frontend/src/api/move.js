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

function moveBitCoinTrade() {
  return ROUTER.push({ name: "BitcoinTrade" });
}

export {
  moveLogin,
  moveSignUp,
  moveStart,
  moveMain,
  moveMyPage,
  moveBitCoinTrade,
};

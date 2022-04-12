import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Main.vue";
import Start from "@/views/Start.vue";
import MainHeader from "../components/commons/MainHeader.vue";
import SubHeader from "../components/commons/SubHeader.vue";

import SignUp from "../views/member/SignUp.vue";
import Login from "../views/member/Login.vue";

/** 같은 페이지에서 같은 페이지로 $router.push 한 오률를 처리함 (ex : 홈페이지에서 홈 로고를 클릭한 경우) */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(() => {
    return window.location.reload();
  });
};

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Start",
    components: { default: Start, header: SubHeader },
  },
  {
    path: "/main",
    name: "Main",
    components: { default: Main, header: MainHeader },
  },
  {
    path: "/signup",
    name: "SignUp",
    components: { default: SignUp, header: SubHeader },
  },
  {
    path: "/login",
    name: "Login",
    components: { default: Login, header: SubHeader },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

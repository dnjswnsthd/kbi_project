<template>
  <header>
    <v-row class="headerBox">
      <div @click="goMain" class="logo">
        <img :src="logo" alt="로고" />
      </div>
      <v-spacer></v-spacer>
      <div class="menuBox">
        <v-row class="menu">
          <div class="menuList" @click="toggleMenu">
            <v-icon class="openImg">mdi-menu</v-icon>
          </div>

          <div @click="goMyPage" class="menuList">
            <img :src="MyPage" alt="마이페이지" class="menuImg" />
          </div>
          <div @click="clickLogout" class="menuList">
            <img :src="logout" alt="로그아웃 이미지" class="menuImg" />
          </div>
        </v-row>
      </div>
    </v-row>
    <alarm></alarm>
  </header>
</template>
<script>
import { moveStart, moveMain, moveMyPage } from "@/api/move.js";
import swal from "sweetalert";
export default {
  name: "MainHeader",
  data() {
    return {
      logo: require("@/assets/images/header/logo.png"),
      logout: require("@/assets/images/header/logout.png"),
      MyPage: require("@/assets/images/header/MyPage.png"),
      alertDialog: false,
      alarmDialog: false,
    };
  },
  methods: {
    goMain() {
      // 메인으로 이동
      moveMain();
    },
    goMyPage() {
      // 마이 페이지로 이동
      moveMyPage();
    },
    toggleMenu() {
      // 메뉴 열고 닫는 메소드
      // openMenu라는 클래스를 toggle하면서 메뉴 열고 닫음.
      const menu = document.querySelector(".menu");
      menu.classList.toggle("openMenu");
    },
    clickLogout() {
      // 로그아웃
      this.$store
        .dispatch("LOGOUT")
        .then(() => {
          moveStart(); // 로그아웃 후 시작페이지로 이동
        })
        .catch((error) => {
          swal(error, {
            icon: "error",
          });
        });
    },
  },
};
</script>
<style scoped>
@import "./../../assets/css/header.css";
.menu {
  right: -224px;
}
.menuBox {
  width: calc(100% - 80px);
}
.menuList {
  width: 20%;
  text-align: center;
}
</style>

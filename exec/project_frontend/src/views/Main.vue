<template>
  <v-container>
    <div>
      <div>
        <p class="font-28">
          <span class="titleText">Main Title</span>
        </p>
      </div>
    </div>
  </v-container>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "Main",
  data() {
    return {
      id: "",
    };
  },
  created() {
    let token = sessionStorage.getItem("X-AUTH-TOKEN");
    let decode = jwt_decode(token); // 가져온 token을 decode함.
    this.id = decode.sub;
    this.getMyRefrigerator();
    this.getSubscribeInfo();
  },
  methods: {},
};
</script>

<style scoped>
@import "./../assets/css/main.css";
</style>

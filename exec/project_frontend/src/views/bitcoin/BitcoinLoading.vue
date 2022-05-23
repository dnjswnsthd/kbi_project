<template>
  <div id="ALL">
    <div id="loadingMain">
      <img class="loadingLogo" src="../../assets/images/loadingLogo.png" />

      <div class="loadingKoreanText">
        <span class="big"><strong>잠시만 기다려주세요.</strong></span
        ><br /><br />
        <span class="small">보안을 위해 브라우저를 확인 중입니다.</span><br />
        <span class="small"
          >이 과정은 자동으로 진행되며, 약 5초정도 소요됩니다.</span
        ><br />
      </div>

      <div class="loading"></div>

      <div class="loadingEnglishTest">
        <span class="big"><strong>Please wait 5 seconds</strong></span
        ><br />
        <span class="middle"
          ><strong
            >Checking your browser before accessing upbit.com.</strong
          ></span
        ><br /><br />
        <span class="small"
          >this process is automatic. Your browser will redirect to your
          requested content shortly.</span
        ><br />
        <span class="small">Please allow up to 5 seconds....</span><br />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import "../../assets/css/bitcoinLoading.css";
</style>

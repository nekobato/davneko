<template>
  <Layout :noheader="true" :nonav="true">
    <p>ログアウト中...</p>
    <IconLoading class="nn-icon" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import IconLoading from "@/assets/icons/loading_oval.svg";
import { rootTypes } from "@/store";

export default Vue.extend({
  components: { IconLoading },
  data() {},
  mounted() {
    this.$axios.delete("/v1/auth/sign_out").then(() => {
      window.location.href = "/app/auth/signin";
    });
  },
});
</script>

<style lang="postcss" scoped>
.signin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #efefef;
  min-height: 100%;
  .logo-container {
    .logo-image {
      width: 131px;
      height: 37px;
    }
  }
  .form-container {
    margin-top: 24px;
    .signin-form {
      display: flex;
      flex-direction: column;
      width: 240px;
    }
    .field-container {
      position: relative;
      display: inline-flex;
      justify-content: stretch;
      margin-top: 16px;
      width: 100%;
      & > .nn-icon {
        position: absolute;
        left: 8px;
        top: 0;
        bottom: 0;
        margin: auto;
        fill: #888;
      }
      input {
        padding-left: 32px;
        width: 100%;
      }
      button {
        width: 100%;
      }
    }
  }
  .error-container {
    margin-top: 16px;
    height: 2em;
    .error-message {
      color: #ff0211;
    }
  }
}
</style>

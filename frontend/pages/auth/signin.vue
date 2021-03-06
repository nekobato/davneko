<template>
  <Layout :noheader="true" :nonav="true">
    <div class="signin">
      <div class="logo-container">
        <img class="logo-image" src="" />
      </div>
      <div class="form-container">
        <form class="signin-form" @submit.prevent="signin">
          <div class="field-container">
            <input
              class="nn-text-field"
              type="email"
              v-model="email"
              placeholder="メールアドレス"
            />
            <IconPerson class="nn-icon" />
          </div>
          <div class="field-container">
            <input
              class="nn-text-field"
              type="password"
              v-model="password"
              placeholder="パスワード"
            />
            <IconKey class="nn-icon" />
          </div>
          <div class="field-container">
            <button class="nn-button type-primary" type="submit">
              <span v-show="!isLoading">サインイン</span>
              <IconLoading class="nn-icon" v-show="isLoading" />
            </button>
          </div>
          <div class="error-container">
            <p class="error-message" v-show="error.message.length">{{ error.message }}</p>
          </div>
        </form>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import IconPerson from "@/assets/icons/person.svg";
import IconKey from "@/assets/icons/lock.svg";
import IconLoading from "@/assets/icons/loading_oval.svg";
import { rootTypes } from "@/store";

export default Vue.extend({
  components: { IconPerson, IconKey, IconLoading },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      error: {
        message: "",
      },
    };
  },
  methods: {
    signin() {
      this.isLoading = true;
      this.error = { message: "" };
      this.$axios
        .post("/v1/auth/sign_in", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          const authData = {
            "access-token": res.headers["access-token"],
            client: res.headers["client"],
            expiry: res.headers["expiry"],
            uid: res.headers["uid"],
          };
          this.$axios.defaults.headers = authData;
          this.$store.commit(rootTypes.SET_AUTH, authData);
          window.localStorage.setItem("auth", JSON.stringify(this.$store.state.auth.data));
          this.$router.push("/invoices/processing");
        })
        .catch((error) => {
          if (error.response?.data?.errors) {
            this.error.message = error.response.data.errors[0];
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
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

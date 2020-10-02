<template>
  <div class="nn-modal-content add-member">
    <h1>メンバーを追加する</h1>
    <TutorialBox>
      業務を分担するメンバーを追加できます。<br />
      メンバーの追加は経営者権限でのみ可能です。
    </TutorialBox>
    <form class="form" @submit.prevent="submit">
      <div class="side-left">
        <label class="nn-label" for="user_detail">ユーザーの詳細</label>
        <input class="nn-text-field" v-model="form.email" placeholder="電子メールアドレス" />
        <input class="nn-text-field" v-model="form.last_name" placeholder="姓" />
        <input class="nn-text-field" v-model="form.first_name" placeholder="名" />
        <input class="nn-text-field" v-model="form.last_name_kana" placeholder="姓（カナ）" />
        <input class="nn-text-field" v-model="form.first_name_kana" placeholder="名（カナ）" />
        <select class="nn-select" v-model="form.roles">
          <option label="権限を選択してください" hidden />
          <option label="経営者" value="president" />
          <option label="経理" value="accounting" />
        </select>
        <button class="nn-button type-primary">保存する</button>
        <p class="error">{{ errorMessage }}</p>
      </div>
      <div class="side-right">
        <!--
        <label class="nn-label" for="user_detail">許可</label>
        <label class="nn-label">
          <input type="checkbox" class="nn-checkbox" @model="form.parmitIgnoreApproval" />
          <span
            >この同僚からのドキュメントは、同僚がワークフローの一部でない限り、承認なしで送信されます。</span
          >
        </label>
        <label class="nn-label">
          <input type="checkbox" class="nn-checkbox" @model="form.permitManualRequest" />
          <span>任意のドキュメントの承認者を手動で指定できます。</span>
        </label>
        <label class="nn-label">
          <input type="checkbox" class="nn-checkbox" @model="form.onlyThisMember" />
          <span>この同僚が提出した文書にのみ適用されます。</span>
        </label>
        --->
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { serialize } from "object-to-formdata";
import TutorialBox from "@/components/TutorialBox.vue";
export default Vue.extend({
  name: "ModalAddMember",
  components: { TutorialBox },
  data() {
    return {
      form: {
        email: "",
        last_name: "",
        first_name: "",
        last_name_kana: "",
        first_name_kana: "",
        name: "",
        roles: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    submit() {
      this.$axios
        .post(`/v1/company/users`, serialize({ user: this.$data.form }))
        .then((res) => {
          if (res.data.error_message) {
            this.errorMessage = res.data.error_message;
          } else {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error(error.response);
          switch (error.response.status) {
            default:
              this.errorMessage =
                "何らかのエラーが発生しました。時間を置いて再度やり直してください。";
              break;
          }
        });
    },
  },
});
</script>

<style lang="postcss" scoped>
.add-member {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 320px;
  max-height: 100%;
  h1 {
    font-size: 24px;
  }
  .form {
    display: flex;
    margin-top: 32px;
    .side-left {
      display: flex;
      flex-direction: column;
      width: 50%;
      label {
        margin-top: 16px;
      }
      .nn-text-field,
      .nn-select {
        margin-top: 8px;
        max-width: 400px;
      }
      .nn-button {
        margin: 40px auto auto 0;
      }
    }
    .side-right {
      margin-left: 24px;
      width: 50%;
    }
    .error {
      color: #ff0211;
    }
  }
}
</style>

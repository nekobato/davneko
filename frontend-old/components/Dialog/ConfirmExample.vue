<template>
  <div class="nn-dialog-content">
    <h1 class="nn-dialog-title">請求書を削除</h1>
    <p class="nn-dialog-text">この請求書を削除してもよろしいですか？この操作は取り消せません</p>
    <div class="nn-dialog-button-group">
      <button class="nn-button type-small type-attention" @click="confirm">
        <span v-show="!isFetching">削除する</span>
        <IconLoading class="nn-icon" v-show="isFetching" />
      </button>
      <button class="nn-button type-small type-secondary" @click="close" :disabled="isFetching">
        <span>キャンセル</span>
      </button>
    </div>
    <p>
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { rootTypes } from "~/store";
import IconLoading from "~/assets/icons/loading_oval.svg";
export default Vue.extend({
  name: "ConfirmDeleteInvoice",
  props: ["payload"],
  components: { IconLoading },
  data() {
    return {
      isFetching: false,
      errorMessage: "",
    };
  },
  methods: {
    close() {
      this.$store.commit("CLOSE_DIALOG");
    },
    confirm() {
      this.$axios
        .delete(`/v1/invoices/${this.payload.item.id}`)
        .then(res => {
          window.location.reload();
        })
        .catch(error => {
          console.error(error.response);
          switch (error.response.status) {
            case 404:
              this.errorMessage = "対象の請求書が見つかりません。選択画面からやり直してください。";
              break;
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
.label-container {
  position: absolute;
  bottom: 4px;
  right: 8px;
  display: flex;
}
.nn-dialog-button-group {
  width: 320px;
  button {
    width: 120px;
  }
}
.nn-inline-label {
  margin: 24px 0 0 auto;
}
</style>

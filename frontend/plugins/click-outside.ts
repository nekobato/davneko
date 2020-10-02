import Vue from "vue";

Vue.directive("click-outside", {
  bind(el: any, { expression }: any, vnode) {
    el.addEventListener("click", (e: Event) => {
      e.stopPropagation();
    });
    document.body.addEventListener("click", (event) => {
      vnode.context.$emit(expression);
    });
  },
  unbind(el: any, { expression }: any, vnode) {
    el.removeEventListener("click", (e: Event) => {
      e.stopPropagation();
    });
    document.body.removeEventListener("click", () => {
      vnode.context.$emit(expression);
    });
  },
});

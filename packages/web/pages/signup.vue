<script lang="ts" setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const onSubmit = async () => {
  const data = await useApi("/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  if (data.error) {
    console.error(data.error);
    return;
  }
};
</script>
<template>
  <NuxtLayout name="signin">
    <div class="container">
      <div class="box">
        <h1>Sign up</h1>
        <form @submit.prevent="onSubmit">
          <div class="input-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              autocomplete="email"
              v-model="email"
            />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              autocomplete="new-password"
              v-model="password"
            />
          </div>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.box {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
h1 {
  margin-bottom: 20px;
}
input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}
button {
  width: 100%;
  padding: 8px;
  background-color: var(--color-primary);
  color: var(--color-grey-800);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: var(--color-primary-t200);
}
</style>

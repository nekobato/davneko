<script lang="ts" setup>
onMounted(async () => {
  await useApi("/auth/status", {
    cache: "no-cache"
  })
    .then((res) => {
      if (res.data.value) {
        console.log("User is signed in");
      }
    })
    .catch((err) => {
      console.error(err);
    });
});
</script>
<template>
  <NuxtLayout name="signin">
    <div class="container">
      <h1>Home</h1>
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
.signin-box {
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

<template>
  <div class="container center">
    <div class="row">
      <div class="col s10 offset-s1 m8 offset-m2 l6 offset-l3">
        <div class="card">
          <h1 class="card-content green-text text-darken-1">davneko</h1>
          <form class="card-action" method="post" action="/api/auth/login">
            <div class="input-field">
              <input
                class="validate"
                type="text"
                name="username"
                placeholder="username"
              />
            </div>
            <div class="input-field">
              <input
                class="validate"
                type="password"
                name="password"
                placeholder="password"
              />
            </div>
            <input
              class="btn waves-effect waves-light"
              type="submit"
              value="Enter"
              autofocus="autofocus"
            />
          </form>
        </div>
      </div>
    </div></div
></template>

<script>
export default {};
</script>

<style></style>

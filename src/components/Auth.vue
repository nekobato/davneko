<template>
<div class="container center">
  <div class="card">
    <h1 class="card-content green-text text-darken-1">davneko</h1>
    <form class="card-action" method="post" @submit.prevent="post">
      <div class="input-field"><input class="validate" type="text" v-model="username" placeholder="username" /></div>
      <div class="input-field"><input class="validate" type="password" v-model="password" placeholder="password" /></div><input class="btn waves-effect waves-light" type="submit" value="Enter" autofocus="autofocus" /></form>
  </div>
</div>
</template>
<script>
import { postAuth } from '../api'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    post () {
      postAuth({
        username: this.$data.username,
        password: this.$data.password
      })
        .then((res) => {
          this.getStatus()
        })
    },
    getStatus () {
      fetchStatus()
        .then((res) => {
          if (res.data.status) {
            this.$route.push('app')
          }
        })
    }
  },
  mounted () {
    this.getStatus()
  }
}
</script>
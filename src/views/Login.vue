<template>
  <div class="parent">
    <div class="login-form">
      <h1>Account Login</h1>
      <div class="login-data">
        <div class="data-field">
          <input type="text" v-model="userName" placeholder="Email" required >
        </div>
        <div class="data-field">
          <input type="password" v-model ="password" placeholder="Password" required>
        </div>
        <button type="submit" @click="auth()">login</button>
        <p>Create an Account? <router-link to="/registry">Sign up</router-link></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    auth () {
      this.$store.dispatch('loginUser', { email: this.$data.userName, password: this.$data.password })
    }
  }
}
</script>
<style lang="sass" scoped>
.login-form
  width: 300px
  margin: auto
  border: 1px solid #fefefe
  border-radius: 10px
  box-shadow: 10px rgba(128, 128, 128, 0.5)
  padding: 30px
  background-color: #fff

p
  text-align: center
</style>

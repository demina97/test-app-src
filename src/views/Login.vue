<template>
  <div class="parent">
    <form class="login-form" @submit.prevent="auth()">
      <h1>Account Login</h1>
      <div class="login-data">
        <div class="data-field">
          <small for="email" v-if="$v.email.$dirty && !$v.email.required">Email must be required</small>
          <small for="email" v-else-if="$v.email.$dirty && !$v.email.email">Input correct email</small>
          <input
          id="email"
          type="text"
          v-model.trim="email"
          placeholder="Email"
          :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
          >
        </div>
        <div class="data-field">
          <small for="password" v-if="$v.password.$dirty && !$v.password.required">Password must be required</small>
          <small for="password" v-else-if="$v.password.$dirty && !$v.password.minLength">
            Input correct password (length more than {{$v.password.$params.minLength.min}})
          </small>
          <input
          id="password"
          type="password"
          v-model ="password"
          placeholder="Password"
          :class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }"
          >
        </div>
        <button type="submit">login</button>
        <p>Create an Account? <router-link to="/registry">Sign up</router-link></p>
      </div>
    </form>
  </div>
</template>
<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    auth () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.$store.dispatch('loginUser', { email: this.$data.userName, password: this.$data.password })
    }
  }
}
</script>
<style lang="sass" scoped>
.invalid
  border: 1px solid red

small
  color: red
  font-family: "Roboto", sans-serif
  font-size: 12px
  font-weight: 400

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

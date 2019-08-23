<template>
  <div class="parent">
    <form class="registry-form" @submit.prevent="auth()">
      <h1>Sign up</h1>
      <div class="registry-data">
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
        <div class="data-field">
          <small for="confirmedPassword" v-if="!$v.confirmedPassword.sameAsPassword">Passwords must be identical</small>
          <input
          id="confirmedPassword"
          type="password"
          v-model ="confirmedPassword"
          placeholder="Confirm password"
          :class="{ invalid: !$v.confirmedPassword.sameAsPassword }"
          >
        </div>
        <button type="submit">sign up</button>
      </div>
    </form>
  </div>
</template>
<script>
import { email, required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'registry',
  data: () => ({
    email: '',
    password: '',
    confirmedPassword: ''
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    confirmedPassword: { sameAsPassword: sameAs('password') }
  },
  methods: {
    auth () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
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

.registry-form
  width: 300px
  margin: auto
  border: 1px solid #fefefe
  border-radius: 10px
  box-shadow: 10px rgba(128, 128, 128, 0.5)
  padding: 30px
  background-color: #fff
</style>

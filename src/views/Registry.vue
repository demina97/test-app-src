<template>
  <div class="parent">
    <div class="registry-form">
      <h1>Sign up</h1>
      <div class="registry-data">
        <div class="data-field">
          <input type="text" v-model="userName" placeholder="Email" required>
        </div>
        <div class="data-field">
          <input type="password" v-model ="password" placeholder="Password" required>
        </div>
        <div class="data-field">
          <input type="password" v-model ="confirmedPassword" placeholder="Confirm password" required>
        </div>
        <button type="submit" @click="auth()">sign up</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'registry',
  data () {
    return {
      userName: '',
      password: '',
      confirmedPassword: ''
    }
  },
  methods: {
    auth () {
      if(this.confirmedPassword === this.password){
        this.$store.dispatch('registryUser', { email: this.$data.userName, password: this.$data.password })
      } else {
        alert("Passwords don't match!")
        this.password = ''
        this.confirmedPassword = ''
      }
      
    }
  }
} 
</script>
<style lang="sass" scoped>
.registry-form
  width: 300px
  margin: auto
  border: 1px solid #fefefe
  border-radius: 10px
  box-shadow: 10px rgba(128, 128, 128, 0.5)
  padding: 30px
  background-color: #fff
</style>

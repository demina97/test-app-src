<template>
  <div class="parent">
    <div id="nav">
        <router-link to="/"><img src="@/assets/icons8-go-back-64.png"></router-link>
    </div>
    <div class = "detailed-record">
      <div class="avatar">
        <img :src="record.avatar">
      </div>
      <div class="info">
        <p>{{record.first_name + ' ' + record.last_name}}</p>
        <p>{{record.email}}</p>
        <button @click="edit()">Edit record</button>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailedRecord',
  computed: {
    record () {
      return this.$store.getters.records.find(record => record.id && record.id === this.$route.params.id)
    }
  },
  methods: {
    edit () {
      this.$router.push({ name: 'Edit' })
    }
  }
}
</script>
<style lang="sass" scoped>
#nav
  border: 1px solid rgb(34, 139, 34)
  background-color: rgb(34, 139, 34)
  padding: 1px
  border-radius: 50px

#nav img
  margin-bottom: -3px

.parent
  width: 100%
  height: 100%
  position: fixed
  top: 0
  left: 0
  display: flex
  align-items: center
  justify-content: center
  overflow: auto
  background-color: rgba(34, 139, 34, 0.15)

.detailed-record
  border: 1px solid #228B22
  margin-bottom: 10px
  padding: 20px 30px 20px 30px
  border: 1px solid #fefefe
  border-radius: 10px
  box-shadow: 10px rgba(128, 128, 128, 0.5)
  background-color: #fff
  margin-left: 20px

p
  margin: 0
  padding: 0
  padding-bottom: 35px

</style>

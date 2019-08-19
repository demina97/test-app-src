<template>
<div>
  <div class="parent">
    <div class="records">
      <div class="record"  v-bind:key="'record' + record.id" v-for="record in records">
        <div class="avatar">
          <img :src="record.avatar">
        </div>
        <div class="info">
          <p>{{record.first_name + ' ' + record.last_name}}</p>
          <p>{{record.email}}</p>
          <router-link :to="{name: 'record', params: {id : record.id}}"><button>Details</button></router-link>
          <button @click="deleteRecord(record.id)">Delete record</button>
        </div>
      </div>
      <div class="pagination">
        <div class="pagination-button" id="prev"  @click="prevPage()">Prev</div>
        <div class="current-page"> {{this.page}}</div>
        <div class="pagination-button" id="next" @click="nextPage()">Next</div>
         
      </div>
    </div><button class="sign-out" @click="signOut()">Sign Out</button>
  </div>
</div>
  
</template>

<script>
export default {
  data () {
    return {
      page: 1
    }
  },
  name: 'records',
  methods: {
    pageNumber () {
      return this.$store.getters.pageNumber
    },
    nextPage () {
      if (this.page < this.pageNumber()) {
        this.page++
        this.$store.dispatch('selectPage', this.page)
      }
    },
    prevPage () {
      if (this.page > 1) {
        this.page--
        this.$store.dispatch('selectPage', this.page)
      }
    },
    selectedPage (n) {
      this.$store.dispatch('selectPage', n)
    },
    deleteRecord (id) {
      this.$store.dispatch('deleteRecord', id)
    },
    signOut () {
      console.log("OUT")
      localStorage.removeItem('user-token')
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    records () {
      return this.$store.getters.records
    }
  },
  created: function () {
    this.$store.dispatch('initRecords')
    this.$store.dispatch('initPageNumber')
  }
}
</script>
<style lang="sass" scoped>
.records
  margin: auto
  border: 1px solid #fefefe
  border-radius: 10px
  box-shadow: 10px rgba(128, 128, 128, 0.5)
  padding: 30px
  background-color: #fff

.record
  border: 1px solid #228B22
  margin-bottom: 10px
  padding: 20px 30px 20px 30px
  border: 1px solid #fefefe
  border-radius: 10px
  box-shadow: 10px rgba(128, 128, 128, 0.5)
  background-color: rgba(128, 128, 128, 0.15)

button
  width: auto

p
  margin: 0
  padding: 0
  padding-bottom: 35px

button:first-child
  margin-right: 10px

.pagination
  display: flex
  align-items: center
  justify-content: center
  margin-top: 20px

.pagination-button
  float: left
  padding: 8px
  background-color: #228B22
  color: #fff

.current-page
  float: left
  padding: 8px
  margin: 0px 8px
  background-color: rgba(128, 128, 128, 0.15)

#prev
  border-radius: 10px 0px 0px 10px

#next
  border-radius: 0px 10px 10px 0px

.sign-out
  margin-top: -850px
</style>

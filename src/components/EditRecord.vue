<template>
<div>
  <hr>
  <h1>Edit Account INFO</h1>
  <div class="data-field">
    <input type="text" v-model.lazy="storeRecord.first_name">
  </div>
  <div class="data-field">
    <input type="text" v-model.lazy="storeRecord.last_name">
  </div>
  <div class="data-field">
    <input type="email" v-model.lazy="storeRecord.email">
  </div>
  <div class="data-field">
    <input type="url" v-model.lazy="storeRecord.avatar">
  </div>
  <p>{{storeRecord.updatedAt}}</p>
  <br>
  <button type="submit" @click="editRecord()">edit</button>
</div>
</template>

<script>
export default {
  name: 'editRecord',
  methods: {
    editRecord () {
      this.$store.dispatch('editRecord')
    }
  },
  computed: {
    updatedAt () {
      return this.$store.getters.record.updatedAt
    },
    storeRecord: {
      get () {
        return this.$store.getters.record
      },
      set (record) {
        this.$store.commit('SET_RECORD', record)
      }
    }
  },
  created: function () {
    this.$store.commit('LOAD_USER', this.$route.params.id)
  }
}
</script>

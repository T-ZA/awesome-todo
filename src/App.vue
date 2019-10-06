<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created() {
    this.getSettings()
    this.handleAuthStateChange()
  },
  methods: {
    ...mapActions('settings', ['getSettings']),
    ...mapActions('auth',['handleAuthStateChange'])
  }
}
</script>

<style lang="scss">
.text-strikethrough {
  text-decoration: line-through;
}
</style>

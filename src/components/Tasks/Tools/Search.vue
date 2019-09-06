<template>
  <q-input
    v-model="searchField"
    outlined
    label="Search Tasks"
    class="col"
    type="search"
  >
    <template v-slot:append>
      <!-- Clear Input -->
      <q-icon
        v-if="searchField !== ''"
        name="close"
        class="cursor-pointer"
        @click="searchField = ''"
      />

      <!-- Search Icon -->
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapState('tasks', ['search']),
      searchField: {
        get () {
          return this.search
        },
        set (value) {
          this.setSearch(value)
        }
      }
    },
    methods: {
      ...mapActions('tasks', ['setSearch'])
    }
  }
</script>

<style lang="scss" scoped>

</style>

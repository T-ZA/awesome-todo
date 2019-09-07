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
      /*
        We're mapping state directly here because there isn't a need
        to modify this property in state through actions; we're just
        getting/setting it as-is
      */
      ...mapState('tasks', ['search']),

      /*
        Computed properties can have custom methods for retrieving
        or setting its value.
      */
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

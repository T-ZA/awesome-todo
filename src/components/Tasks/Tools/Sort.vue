<template>
  <q-select
    v-model="sortBy"
    outlined
    :options="options"
    label="Sort By"
    stack-label
    class="col q-ml-sm"
    map-options
    emit-value
  />
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data() {
      return {
        options: [
          {
            label: 'Name',
            value: 'name'
          },
          {
            label: 'Date',
            value: 'dueDate'
          }
        ]
      }
    },
    computed: {
      /*
        We're mapping state directly here because there isn't a need
        to modify this property in state through actions; we're just
        getting/setting it as-is
      */
      ...mapState('tasks', ['sort']),

      /*
        Computed properties can have custom methods for retrieving
        or setting its value.
      */
      sortBy: {
        get() {
          return this.sort
        },
        set(value) {
          this.setSort(value)
        }
      }
    },
    methods: {
      ...mapActions('tasks', ['setSort'])
    }
  }
</script>

<style lang="scss" scoped>
.q-select {
  flex: 0 0 112px;
}
</style>

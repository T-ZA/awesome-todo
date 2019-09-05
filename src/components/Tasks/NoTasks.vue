<template>
  <q-banner class="bg-grey-3 bg-info">
    <!-- Check icon -->
    <template v-slot:avatar>
      <q-icon
        name="check"
        color="primary"
      />
    </template>

    <!-- Message -->
    <span class="text-h6">No tasks to do today!</span>

    <!-- Add Task button -->
    <template v-slot:action>
      <q-btn
        flat
        color="primary"
        label="Add Task"
        @click="$root.$emit('show-add-task')"
      />
    </template>
  </q-banner>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>

</style>

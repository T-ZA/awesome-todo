<template>
  <!-- Task Name -->
  <div class="row q-mb-sm">
    <q-input
      :value="name"
      outlined
      autofocus
      lazy-rules
      clearable
      clear-icon="close"
      class="col"
      label="Task Name"
      :rules="[val => !!val || 'Task name is required']"
      @input="$emit('update:name', $event)"
    />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },

}
</script>

<template>
  <!-- Task Name -->
  <div class="row q-mb-sm">
    <q-input
      v-select-all
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
import { selectAll } from 'src/directives/directive-select-all'

export default {
  directives: {
    'selectAll': selectAll
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

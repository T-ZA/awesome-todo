<template>
  <li>
    <div>
      <slot></slot> <!-- slot to be received from parent component -->
      {{index}}
    </div>
    <small>{{task.dueDate}} @ {{task.dueTime}}</small>

    <!-- Events example (tell parent component to delete task in the task list -->)
    <button @click="$emit('delete-task', index)">X</button>
  </li>
</template>

<script>
  export default {
    props: ['task', 'index']
  }
</script>

<style lang="scss" scoped>

</style>

<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header :bg-color="'bg-secondary'">
        Todo
      </list-header>

      <q-list
        bordered
        separator
      >
        <task
          v-for="(task, key) in tasksToDo"
          :id="key"
          :key="key"
          :task="task"
        />
      </q-list>
    </div>
  </transition>
</template>

<script>
  export default {
    components: {
      'task': require('components/Tasks/Task.vue').default,
      'list-header': require('components/Shared/ListHeader.vue').default,
    },
    props: {
      // Accepts an object of tasks from the tasks store module
      'tasksToDo' : {
        type: Object,
        default: function(){
          return {}
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>

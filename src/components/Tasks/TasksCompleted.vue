<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div class="q-mt-lg">
      <list-header :bg-color="'bg-positive'">
        Completed
      </list-header>

      <q-list
        bordered
        separator
      >
        <task
          v-for="(task, key) in tasksCompleted"
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
      'tasksCompleted' : {
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

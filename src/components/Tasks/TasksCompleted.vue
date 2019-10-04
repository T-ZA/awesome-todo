<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <!--  Display the gap between the To Do tasks and Completed tasks
          when the show tasks in one list setting is disabled (since this
          would mean that the tasks have separate columns) -->
    <div :class="{ 'q-mt-lg' : !settings.showTasksInOneList }">
      <list-header
        v-if="!settings.showTasksInOneList"
        :bg-color="'bg-positive'"
      >
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
  import { mapGetters } from 'vuex'

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
    computed: {
      ...mapGetters('settings', ['settings'])
    }
  }
</script>

<style lang="scss" scoped>

</style>

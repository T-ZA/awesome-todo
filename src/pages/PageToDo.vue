<template>
  <q-page class="q-pa-md">
    <!-- Tasks To Do List -->
    <no-tasks
      v-if="!Object.keys(tasksToDo).length"
    />

    <tasks-todo
      v-else
      :tasks-to-do="tasksToDo"
    />


    <!-- Task Completed list -->
    <tasks-completed
      v-if="Object.keys(tasksCompleted).length"
      :tasks-completed="tasksCompleted"
    />

    <!-- Add Task button -->
    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        round
        color="primary"
        size="24px"
        icon="add"
        @click="$root.$emit('show-add-task')"
      />
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close-add-task="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    'add-task': require('components/Tasks/Modals/AddTask.vue').default,
    'tasks-todo': require('components/Tasks/TasksToDo.vue').default,
    'tasks-completed': require('components/Tasks/TasksCompleted.vue').default,
    'no-tasks': require('components/Tasks/NoTasks.vue').default
  },
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasksToDo','tasksCompleted'])
  },
  mounted() {
    // Quasar's Global Event Bus can be used to listen to events by name
    // rather than being from a direct child component.
    this.$root.$on('show-add-task', () => {
      this.showAddTask = true
    })
  }
}
</script>

<style>

</style>

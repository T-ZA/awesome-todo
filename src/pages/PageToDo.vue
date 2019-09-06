<template>
  <q-page class="q-pa-md">
    <!-- Search Bar -->
    <div class="row q-mb-lg">
      <search />
    </div>

    <!-- No Search Results message -->
    <div v-if="search && !Object.keys(tasksToDo).length && !Object.keys(tasksCompleted).length">
      No search results
    </div>


    <!-- All Tasks Completed message -->
    <no-tasks
      v-if="!Object.keys(tasksToDo).length && !search"
    />

    <!-- Tasks To Do List -->
    <tasks-todo
      v-if="Object.keys(tasksToDo).length"
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

    <!-- Add Task dialog -->
    <q-dialog v-model="showAddTask">
      <add-task @close-add-task="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  components: {
    'add-task': require('components/Tasks/Modals/AddTask.vue').default,
    'tasks-todo': require('components/Tasks/TasksToDo.vue').default,
    'tasks-completed': require('components/Tasks/TasksCompleted.vue').default,
    'no-tasks': require('components/Tasks/NoTasks.vue').default,
    'search': require('components/Tasks/Tools/Search.vue').default,
  },
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasksToDo','tasksCompleted']),
    ...mapState('tasks', ['search'])
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

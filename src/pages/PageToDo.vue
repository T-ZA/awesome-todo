<template>
  <q-page>
    <!-- Display the tasks interface once all tasks have been downloaded -->
    <template v-if="tasksDownloaded">
      <div class="absolute fit column q-pa-md">
        <!-- Search Bar -->
        <div class="row q-mb-lg">
          <search />
          <sort />
        </div>

        <!-- No Search Results message -->
        <div v-if="search && !Object.keys(tasksToDo).length && !Object.keys(tasksCompleted).length">
          No search results
        </div>

        <!-- This div is used for positioning the task list components
          (to do, completed, all tasks message) in the same container
          so the to do list disappearing will be at the top of the
          comtainer insterad of the top of the page. -->
        <q-scroll-area
          class="relative-position q-scroll-area-tasks"
        >
          <!-- All Tasks Completed message -->
          <no-tasks
            v-if="!Object.keys(tasksToDo).length && !search && !settings.showTasksInOneList"
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
            class="q-mb-xl"
          />
        </q-scroll-area>

        <!-- Add Task button -->
        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            round
            color="primary"
            size="24px"
            icon="add"
            class="all-pointer-events"
            @click="$root.$emit('show-add-task')"
          />
        </div>

        <!-- Add Task dialog -->
        <q-dialog v-model="showAddTask">
          <add-task @close-add-task="showAddTask = false" />
        </q-dialog>
      </div>
    </template>

    <!-- Otherwise, show the spoinner component to indicate loading -->
    <!-- <template v-else>
      <span class="absolute-center">
        <q-spinner
          color="primary"
          size="10em"
        />
      </span>
    </template> -->
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
    'sort': require('components/Tasks/Tools/Sort.vue').default,
  },
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasksToDo','tasksCompleted']),
    ...mapGetters('settings', ['settings']),
    ...mapState('tasks', ['search','tasksDownloaded'])
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
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>

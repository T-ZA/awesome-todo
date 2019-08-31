<template>
  <q-page class="q-pa-md">
    <!-- Task List -->
    <q-list
      v-if="Object.keys(tasks).length"
      bordered
      separator
    >
      <task
        v-for="(task, key) in tasks"
        :id="key"
        :key="key"
        :task="task"
      />
    </q-list>

    <!-- Add Task button -->
    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        round
        color="primary"
        size="24px"
        icon="add"
        @click="showAddTask = true"
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
    'task': require('components/Tasks/Task.vue').default,
    'add-task': require('components/Tasks/Modals/AddTask.vue').default,
  },
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasks'])
  },
}
</script>

<style>

</style>

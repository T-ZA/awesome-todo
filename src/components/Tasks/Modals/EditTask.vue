<template>
  <q-card>
    <modal-header>Edit Task</modal-header>

    <q-form @submit.prevent="submitForm">
      <q-card-section>
        <modal-task-name :name.sync="taskToSubmit.name" />

        <!-- Task Due Date -->
        <modal-due-date
          :due-date.sync="taskToSubmit.dueDate"
          @clear="clearDueDate"
        />

        <!-- Task Due Time -->
        <modal-due-time
          v-if="taskToSubmit.dueDate"
          :due-time.sync="taskToSubmit.dueTime"
        />
      </q-card-section>

      <!-- Save Task button -->
      <modal-buttons />
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'

export default {
  mixins: [mixinAddEditTask],
  props: {
    'task': {
      type: Object,
      default: function() {
        return {}
      }
    },
    'taskId': {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      taskToSubmit: {}
    }
  },
  mounted() {
    this.taskToSubmit = Object.assign({}, this.task)
  },
  methods: {
    ...mapActions('tasks', ['updateTask']),
    submitTask() {
      this.updateTask({
        id: this.taskId,
        updates: this.taskToSubmit
      })
      this.$emit('close-edit-task')
    }
  },

}
</script>

<style lang="scss" scoped>

</style>

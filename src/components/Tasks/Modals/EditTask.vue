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

export default {
  components: {
    'modal-header': require('components/Tasks/Modals/Shared/ModalHeader.vue').default,
    'modal-task-name': require('components/Tasks/Modals/Shared/ModalTaskName.vue').default,
    'modal-due-date': require('components/Tasks/Modals/Shared/ModalDueDate.vue').default,
    'modal-due-time': require('components/Tasks/Modals/Shared/ModalDueTime.vue').default,
    'modal-buttons': require('components/Tasks/Modals/Shared/ModalButtons.vue').default,
  },
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
    clearDueDate() {
      this.taskToSubmit.dueDate = ''
      this.taskToSubmit.dueTime = ''
    },
    submitForm() {
      console.log('submitForm')
      this.submitTask()
    },
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

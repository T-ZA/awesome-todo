<template>
  <q-item
    v-ripple
    clickable
    :class="!task.completed ? 'bg-deep-purple-2' : 'bg-green-2'"
    @click="updateTask(
      {
        id,
        updates: {
          completed: !task.completed
        }
      })"
  >
    <!-- Checkbox to Toggle Comlete -->
    <q-item-section
      side
      top
    >
      <q-checkbox
        class="no-pointer-events"
        :value="task.completed"
      />
    </q-item-section>

    <!-- Task Name -->
    <q-item-section>
      <q-item-label :class="{ 'text-strikethrough' : task.completed }">
        {{ task.name }}
      </q-item-label>
    </q-item-section>

    <!-- Task Date/Time -->
    <q-item-section
      v-if="task.dueDate"
      side
    >
      <div class="row">
        <div class="column justify-center">
          <!-- Event icon -->
          <q-icon
            name="event"
            size="18px"
            class="q-mr-xs"
          />
        </div>

        <!-- Date/Time section -->
        <div class="column">
          <!-- Date -->
          <q-item-label
            caption
            class=" row justify-end"
          >
            {{ task.dueDate }}
          </q-item-label>

          <!-- Time -->
          <q-item-label
            caption
            class=" row justify-end"
          >
            <small>{{ task.dueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>


    <q-item-section side>
      <div class="row">
        <!-- Edit Task button -->
        <q-btn
          flat
          round
          dense
          color="primary"
          icon="edit"
          @click.stop="showEditTask = true"
        >
        <!--
          @click.stop prevents the @click method
          from being fired on the parent component
          while allowing the button's @click handler
          to trigger.
        -->
        </q-btn>

        <!-- Delete Task button -->
        <q-btn
          flat
          round
          dense
          color="negative"
          icon="delete"
          @click.stop="promptToDelete(id)"
        >
        <!--
          @click.stop prevents the @click method
          from being fired on the parent component
          while allowing the button's @click handler
          to trigger.
        -->
        </q-btn>
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-task
        :task="task"
        :task-id="id"
        @close-edit-task="showEditTask = false"
      />
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions }  from 'vuex'

  export default {
    components: {
      'edit-task': require('components/Tasks/Modals/EditTask.vue').default
    },
    props: {
      // A single task from the tasks store module to display
      task: {
        type: Object,
        default: function () {
          return {
            name: '',
            dueDate: '',
            dueTime: '',
            completed: false
          }
        }
      },
      // The ID of the task
      id: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        showEditTask: false
      }
    },
    methods: {
      ...mapActions('tasks', ['updateTask','deleteTask']),
      promptToDelete(id) {
        // Quasar plugin for dialogs
        this.$q.dialog({
          title: 'Delete Task',
          message: 'Would you like to delete this task?',
          cancel: true,
          persistent: false
        }).onOk(() => {
          this.deleteTask(id)
        })
      }
    }
  }
</script>

<style>

</style>

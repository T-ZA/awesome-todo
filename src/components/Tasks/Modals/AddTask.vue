<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">
        Add Task
      </div>
      <q-space />
      <q-btn
        v-close-popup
        icon="close"
        flat
        round
        dense
      />
    </q-card-section>

    <q-form @submit.prevent="submitForm">
      <q-card-section>
        <!-- Task Name -->
        <div class="row q-mb-sm">
          <q-input
            v-model="taskToSubmit.name"
            outlined
            autofocus
            lazy-rules
            clearable
            clear-icon="close"
            class="col"
            label="Task Name"
            :rules="[val => !!val || 'Task name is required']"
          />
        </div>

        <!-- Task Due Date -->
        <div class="row q-mb-sm">
          <q-input
            v-model="taskToSubmit.dueDate"
            outlined
            label="Due Date"
            mask="date"
          >
            <template v-slot:append>
              <!-- Clear Field Icon -->
              <q-icon
                v-if="taskToSubmit.dueDate"
                name="close"
                class="cursor-pointer"
                @click.stop="clearDueDate"
              />

              <!-- Calendar Icon (opens date picker modal) -->
              <q-icon
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="taskToSubmit.dueDate"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <!-- Task Due Time -->
        <div
          v-if="taskToSubmit.dueDate"
          class="row q-mb-sm"
        >
          <q-input
            v-model="taskToSubmit.dueTime"
            outlined
            label="Due Time"
            mask="time"
            class="col"
          >
            <template v-slot:append>
              <!-- Clear Field Icon -->
              <q-icon
                v-if="taskToSubmit.dueTime"
                name="close"
                class="cursor-pointer"
                @click.stop="taskToSubmit.dueTime = ''"
              />

              <!-- Clock Icon (opens time picker modal) -->
              <q-icon
                name="access_time"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="taskToSubmit.dueTime" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <!-- Save Task button -->
        <q-btn
          label="Save"
          color="primary"
          type="submit"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      taskToSubmit: {
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false
      }
    };
  },
  methods: {
    ...mapActions('tasks', ['addTask']),
    submitForm() {
      this.submitTask();
    },
    submitTask() {
      let taskData = {
        name: this.taskToSubmit.name,
        dueDate: this.taskToSubmit.dueDate,
        dueTime: this.taskToSubmit.dueTime,
        completed: this.taskToSubmit.completed
      };
      this.addTask(taskData);
      this.$emit('close-add-task');
    },
    clearDueDate() {
      this.taskToSubmit.dueDate = ''
      this.taskToSubmit.dueTime = ''
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

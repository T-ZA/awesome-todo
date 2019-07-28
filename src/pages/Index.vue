<template>
  <q-page padding>
    <ul>
      <!-- Child component / v-for / respond to child event example -->
      <task
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        :index="index"
        v-on:delete-task="deleteTask($event)">
        {{task.name}} <!-- slot example -->
      </task>
    </ul>
  </q-page>
</template>

<script>
export default {
  components: {
    'task': require('components/Task.vue').default
  },
  data() {
    return {
      tasks: [
        {
          name: 'Do the ting',
          dueDate: '2019/07/26',
          dueTime: '03:30'
        },
        {
          name: 'Do the other ting',
          dueDate: '2019/07/26',
          dueTime: '03:30'
        },
        {
          name: 'Do all the tings',
          dueDate: '2019/07/26',
          dueTime: '03:30'
        }
      ]
    };
  },
  methods: {
    deleteTask(index) {
      this.tasks.splice(index, 1);
    }
  }
};
</script>

<style>
.border-grey {
  border: 1px solid grey;
}

input,
button {
  font-size: 23px;
}

.error {
  color: red;
  background: pink;
}
</style>

<template>
  <q-page class="q-pa-md">
    <q-list
      bordered
      separator>
      <q-item
        v-ripple
        clickable
        v-for="task in tasks"
        :key="task.id"
        @click="task.completed = !task.completed"
        :class="!task.completed ? 'bg-deep-purple-1' : 'bg-green-1'"
        >
        <q-item-section side top>
          <q-checkbox v-model="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label :class="{ 'text-strikethrough' : task.completed }">
            {{task.name}}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <div class="column justify-center">
              <q-icon
                name="event"
                size="18px"
                class="q-mr-xs" />
            </div>
            <div class="column">
              <q-item-label caption class=" row justify-end">
                {{task.dueDate}}
              </q-item-label>
              <q-item-label caption class=" row justify-end">
                <small>{{task.dueTime}}</small>
              </q-item-label>
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
  export default {
    data() {
      return {
        tasks: [
          {
            id: 1,
            name: 'Task 1',
            completed: false,
            dueDate: '08/08/2019',
            dueTime: '00:00'
          },
          {
            id: 2,
            name: 'Task 2',
            completed: false,
            dueDate: '08/08/2019',
            dueTime: '00:00'
          },
          {
            id: 3,
            name: 'Task 3',
            completed: false,
            dueDate: '08/08/2019',
            dueTime: '00:00'
          }
        ]
      }
    }
  }
</script>

<style>

</style>

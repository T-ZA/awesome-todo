<template>
  <q-page padding>
    <!-- Main Settings section -->
    <q-list
      bordered
      padding
      class="q-mb-md"
    >
      <q-item-label header>
        Settings
      </q-item-label>

      <!-- Show 12h time format toggle -->
      <q-item
        v-ripple
        tag="label"
      >
        <q-item-section>
          <q-item-label>Show 12h time format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle
            v-model="show12hTimeFormat"
            color="blue"
            val="battery"
          />
        </q-item-section>
      </q-item>

      <!-- Show Tasks in One List toggle -->
      <q-item
        v-ripple
        tag="label"
      >
        <q-item-section>
          <q-item-label>Show tasks in one list</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle
            v-model="showTasksInOneList"
            color="blue"
            val="battery"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- More section -->
    <q-list
      bordered
      padding
    >
      <q-item-label header>
        More
      </q-item-label>

      <!-- Help page -->
      <q-item
        v-ripple
        tag="label"
        to="/settings/help"
      >
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <!-- Visit Our Website -->
      <q-item
        v-ripple
        tag="a"
        @click="visitOurWebsite"
      >
        <q-item-section>
          Visit Our Website
        </q-item-section>
      </q-item>

      <!-- Email Us -->
      <q-item
        v-ripple
        tag="a"
        @click="emailUs"
      >
        <q-item-section>
          Email Us
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { openURL } from 'quasar'

  export default {
    computed: {
      ...mapGetters('settings', ['settings']),
      show12hTimeFormat: {
        get() {
          return this.settings.show12hTimeFormat
        },
        set(value) {
          this.setShow12hTimeFormat(value)
        }
      },
      showTasksInOneList: {
        get() {
          return this.settings.showTasksInOneList
        },
        set(value) {
          this.setShowTasksInOneList(value)
        }
      }
    },
    methods: {
      ...mapActions('settings', ['setShow12hTimeFormat','setShowTasksInOneList']),
      visitOurWebsite() {
        openURL('https://www.google.com')
      },
      emailUs(){
        window.location.href = 'mailto:ricky.sanders62@gmail.com?subject=Awesome ToDo Feedback'
      }
    }
  }
</script>

<style>

</style>

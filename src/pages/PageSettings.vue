<template>
  <q-page padding>
    <q-list
      bordered
      padding
    >
      <q-item-label header>
        Settings
      </q-item-label>

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
    </q-list>
  </q-page>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

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
      }
    },
    methods: {
      ...mapActions('settings', ['setShow12hTimeFormat'])
    }
  }
</script>

<style>

</style>

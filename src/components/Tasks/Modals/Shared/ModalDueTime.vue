<template>
  <div
    class="row q-mb-sm"
  >
    <q-input
      :value="dueTime"
      outlined
      label="Due Time"
      mask="time"
      class="col"
      @input="$emit('update:dueTime', $event)"
    >
      <template v-slot:append>
        <!-- Clear Field Icon -->
        <q-icon
          v-if="dueTime"
          name="close"
          class="cursor-pointer"
          @click.stop="$emit('update:dueTime','')"
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
            <q-time
              :value="dueTime"
              @input="$emit('update:dueTime', $event)"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: {
    'dueTime': {
      type: String,
      default: ''
    }
  }
}
</script>

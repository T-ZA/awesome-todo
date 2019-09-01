<template>
  <div class="row q-mb-sm">
    <q-input
      :value="dueDate"
      outlined
      label="Due Date"
      mask="date"
      @input="$emit('update:dueDate', $event)"
    >
      <template v-slot:append>
        <!-- Clear Field Icon -->
        <q-icon
          v-if="dueDate"
          name="close"
          class="cursor-pointer"
          @click.stop="$emit('clear')"
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
              :value="dueDate"
              @input="$emit('update:dueDate', $event)"
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
    'dueDate': {
      type: String,
      default: ''
    }
  }
}
</script>

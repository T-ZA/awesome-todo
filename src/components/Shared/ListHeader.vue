<template>
  <q-banner
    dense
    inline-actions
    :class="bgColor"
    class="list-header text-white text-center"
  >
    <span class="text-bold text-subtitle1">
      <!-- Title Slot -->
      <slot />
    </span>
  </q-banner>
</template>

<script>
  export default {
    props: {
      // When passed down, this controls the header's background color
      'bgColor': {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
.list-header {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>

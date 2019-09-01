<template>
  <q-card-section class="row">
    <!-- Header Title -->
    <div class="text-h6">
      <slot />
    </div>

    <q-space />

    <!-- Close Popup -->
    <q-btn
      v-close-popup
      icon="close"
      flat
      round
      dense
    />
  </q-card-section>
</template>

<script>
export default {

}
</script>

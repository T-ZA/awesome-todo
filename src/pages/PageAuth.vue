<template>
  <q-page padding>
    <q-card class="auth-tabs">
      <!-- Tabs to choose between the login and register views -->
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab
          name="login"
          label="Login"
        />
        <q-tab
          name="register"
          label="Register"
        />
      </q-tabs>

      <q-separator />

      <!-- Container for displaying views -->
      <q-tab-panels
        v-model="tab"
        animated
      >
        <!-- Login view -->
        <q-tab-panel name="login">
          <login-register :tab="tab" />
        </q-tab-panel>

        <!-- Register view -->
        <q-tab-panel name="register">
          <login-register :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
  export default {
    components: {
      'login-register': require('components/Auth/LoginRegister.vue').default
    },
    data() {
      return {
        tab: 'register'
      }
    }
  }
</script>

<style lang="scss" scoped>
.auth-tabs {
  max-width: 600px;
  margin: 0 auto;
}
</style>

<template>
  <q-form
    @submit.prevent="submitForm()"
  >
    <!-- Banner message -->
    <q-banner class="bg-grey-3 q-mb-md">
      <!-- Banner icon -->
      <template v-slot:avatar>
        <q-icon
          name="account_circle"
          color="primary"
        />
      </template>

      <!-- Change the first word of the banner based on the active tab -->
      {{ tab | titleCase }} to access your Todos anywhere!
    </q-banner>


    <!-- Email input -->
    <div class="row q-mb-md">
      <q-input
        v-model="formData.email"
        outlined
        class="col"
        label="Email"
        stack-label
        :rules="[val => !!val || 'Email is required',
                 val => isValidEmailAddress(val) || 'Please enter a valid email address']"
        lazy-rules
      />
    </div>

    <!-- Password input -->
    <div class="row q-mb-md">
      <q-input
        v-model="formData.password"
        outlined
        class="col"
        label="Password"
        type="password"
        stack-label
        :rules="[ val => !!val || 'Password is required',
                  val => val.length >= 6 || 'Minimum password length is 6 characters']"
        lazy-rules
      />
    </div>

    <!-- Submit button -->
    <div class="row">
      <q-space />
      <q-btn
        :label="tab"
        type="submit"
        color="primary"
      />
    </div>
  </q-form>
</template>

<script>
  export default {
    filters: {
      titleCase(value) {
        // Capitalize the first letter of the passed in string
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
    props: {
      tab: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        formData: {
          email:'',
          password:''
        }
      }
    },
    methods: {
      submitForm() {
        // Choose logic to execute based on the current tab
        if (this.tab == 'login') {
          this.loginUser()
        }
        else {
          this.registerUser()
        }
      },
      isValidEmailAddress(email) {
        // Email regex taken from https://emailregex.com/
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return emailRegex.test(String(email).toLowerCase())
      },
      loginUser() {
        console.log('loginUser')
      },
      registerUser() {
        console.log('registerUser')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

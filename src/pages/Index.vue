<template>
  <q-page padding>
    <button
      @click="counter++"
      style="position: absolute; right: 10px;">{{ counter }}</button>

    <!-- v-model / Vue events / Vue custom directives / refs example -->
    <input
      v-model="message"
      @keyup.esc="clearMessage"
      @keyup.enter="alertMessage"
      v-autofocus
      v-bind:class="{ 'error' : message.length > maxMessageLength }"
      ref="messageInput" />
    <button @click="clearMessage">Clear</button>
    <p>{{ message.length }}/{{ maxMessageLength }}</p>

    <!-- <h5 class="border-grey" v-show="message.length">{{ message }}</h5> -->

    <!-- v-if/v-else example -->
    <h5
      v-if="message.length"
      class="border-grey">{{ message }}</h5>
    <h6 v-else>Please enter a message</h6>

    <hr />

    <!-- Computed property example -->
    <p>Uppercase message: {{ messageUppercase }}</p>

    <!-- Filters example -->
    <p>Lowercase message: {{ message | messageLowercase }}</p>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      message: 'I heart Vue.js',
      maxMessageLength: 22,
      counter: 0
    }
  },
  computed: {
    messageUppercase() {
      return this.message.toUpperCase()
    }
  },
  methods: {
    clearMessage() {
      this.message = ''
    },
    // handleKeyUp(e) {
    //   console.log(e)
    //   switch (e.keyCode) {
    //     case 13: this.alertMessage(this.message); break;
    //     case 27: this.clearMessage(); break;
    //   }
    // },
    alertMessage(){
      alert(this.message)
    }
  },
  filters: {
    messageLowercase(value) {
      return value.toLowerCase()
    }
  },
  directives: {
    // name of directive (prefix with "v-" in a tag's attributes)
    autofocus: {
      // when element is inserted on the page
      inserted(el){
        el.focus()
      }
    }
  },
  // Lifecycle hooks
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
    // this.$refs.messageInput.className = 'bg-green' // don't actually do this
    // refs are good for:
    // form validation, autofocus fields
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
  },
}
</script>

<style>
.border-grey {
  border: 1px solid grey;
}

input, button {
  font-size: 23px;
}

.error {
  color: red;
  background: pink;

}
</style>

<script setup lang="ts">
import { SignInUser } from '@/scripts/users'
import { reactive, ref } from 'vue'

// quick show/hide function
const show = ref('show')
const password = ref('password')
function ShowHidePassword() {
  if (password.value == 'password') {
    password.value = 'text'
    show.value = 'hide'
  } else {
    password.value = 'password'
    show.value = 'show'
  }
}

const form = reactive({
  user_name: '',
  user_email: '',
  user_password: '',
})

const result = ref('')

async function submit() {
  result.value = await SignInUser(form)
}
</script>
<template>
  <p v-if="result" class="error">{{ result.valueOf() }}</p>
  <form @submit.prevent="submit()">
    <!-- fields -->
    <input type="text" v-model="form.user_name" placeholder="user_name" required />
    <input type="email" v-model="form.user_email" placeholder="user_email" required />
    <input
      v-bind:type="password.valueOf()"
      v-model="form.user_password"
      placeholder="user_password"
      required
    />
    <button @click.prevent="ShowHidePassword()">{{ show.valueOf() }}</button>
    <input type="submit" value="Sign In" />
  </form>
</template>

<style lang="scss"></style>

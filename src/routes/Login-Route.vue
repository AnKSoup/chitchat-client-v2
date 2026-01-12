<script setup lang="ts">
import iconList from '@/components/icon-list.vue'
import { homeIcon, loginIcon, signinIcon } from '@/assets/objects/icons'
import { LogInUser } from '@/scripts/users'
import { reactive, ref } from 'vue'

// quick show/hide function
const show = ref('👁')
const password = ref('password')
function ShowHidePassword() {
  if (password.value == 'password') {
    password.value = 'text'
    show.value = '⌣'
  } else {
    password.value = 'password'
    show.value = '👁'
  }
}

const form = reactive({
  user_email: '',
  user_password: '',
})

const result = ref('')

async function submit() {
  result.value = await LogInUser(form)
}
</script>
<template>
  <div class="ui-container">
    <nav id="nav">
      <icon-list class="grow" :icons-array="[[homeIcon], [signinIcon, loginIcon]]" />
    </nav>
    <main class="form">
      <form @submit.prevent="submit()">
        <!-- fields -->
        <input type="email" v-model="form.user_email" placeholder="user_email" required />
        <div>
          <input
            v-bind:type="password.valueOf()"
            v-model="form.user_password"
            placeholder="user_password"
            required
          />
          <div class="eye" @click="ShowHidePassword()">{{ show.valueOf() }}</div>
        </div>
        <input class="button" type="submit" value="Log In" />
      </form>
      <p v-if="result" class="error">{{ result.valueOf() }}</p>
    </main>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/main-ui.scss';
@use '@/assets/styles/form.scss';
@use '@/assets/styles/button.scss';

//OVERRIDES:
</style>

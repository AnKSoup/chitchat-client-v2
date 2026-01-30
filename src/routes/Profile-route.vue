<script setup lang="ts">
import { blogIcon, chatIcon, loginIcon, logoutIcon, profileIcon } from '@/objects/icons'
import IconList from '@/components/icon-list.vue'
import ProfilePictureItem from '@/components/profile-picture-item.vue'
import { KeysCheckers } from '@/scripts/encryption'
import { generateGradient } from '@/scripts/gradients'
import {
  ChangePass,
  EditCurrentUser,
  GenerateKeysForCurrentUser,
  GetMyInfo,
  SoftLogout,
} from '@/scripts/users'
import { onMounted, reactive, ref } from 'vue'

const edit = ref(false)
const change_pass = ref(false)
const user = ref({ user_name: '', user_email: '', user_created_at: '' })
const red = ref(generateGradient('red'))

const form = reactive({
  user_name: '',
  user_email: '',
})

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
const user_password = reactive({
  pass: '',
})

const error = ref('')
const pass_error = ref('')
const keys = ref({ error: false, text: 'loading...' })

async function EditMyself() {
  const result = await EditCurrentUser(form)
  if (result) {
    error.value = result
  } else {
    Reload()
  }
}

async function ChangeMyPass() {
  if (confirm('THIS ACTION WILL LOG YOU OUT!')) {
    const result = await ChangePass(user_password.pass)
    if (result) {
      pass_error.value = result
    } else {
      SoftLogout()
    }
  }
}

async function ResetKeys() {
  if (
    confirm(
      'THIS ACTION WILL RESET YOUR KEYS!\nDoing this will prevent you from accessing your conversations unless the owner adds you back in.',
    )
  ) {
    await GenerateKeysForCurrentUser()
    Reload()
  }
}

async function Reload() {
  user.value = await GetMyInfo()
  edit.value = false

  form.user_name = user.value.user_name
  form.user_email = user.value.user_email

  keys.value = await KeysCheckers()
}

onMounted(async () => {
  Reload()
})
</script>
<template>
  <div class="ui-container">
    <!-- TOP hEADER -->
    <nav id="nav">
      <icon-list :icons-array="[[profileIcon, chatIcon, blogIcon]]" />
      <icon-list class="grow" :icons-array="[[], [loginIcon, logoutIcon]]" />
    </nav>

    <main>
      <!-- Has to be editable when the feature is implemented -->
      <ProfilePictureItem />
      <div class="card grow" v-if="!edit.valueOf()">
        <div class="field-container">
          <div class="field-bundle">
            <p class="field holder">Name</p>
            <p class="field">{{ user.user_name }}</p>
          </div>
          <div class="field-bundle">
            <p class="field holder">Email</p>
            <p class="field">{{ user.user_email }}</p>
          </div>
        </div>
        <button @click="edit = !edit.valueOf()">Edit</button>
      </div>

      <div class="card grow" v-if="edit.valueOf()">
        <div class="field-container">
          <input class="field" type="text" v-model="form.user_name" placeholder="Name" />
          <input class="field" type="email" v-model="form.user_email" placeholder="Email" />
          <p class="error" v-if="error">{{ error }}</p>
        </div>
        <div class="button-bundle">
          <button class="red" @click="edit = !edit.valueOf()">Cancel</button>
          <button @click="EditMyself()">Change</button>
        </div>
      </div>

      <div class="card grow" v-if="change_pass.valueOf()">
        <div class="field-container">
          <div class="field-pass-container">
            <input
              class="field"
              v-bind:type="password.valueOf()"
              v-model="user_password.pass"
              placeholder="Password"
              required
            />
            <div class="eye" @click="ShowHidePassword()">{{ show.valueOf() }}</div>
          </div>
          <p class="error" v-if="pass_error">{{ pass_error }}</p>
        </div>
        <div class="button-bundle">
          <button class="red" @click="change_pass = !change_pass.valueOf()">Cancel</button>
          <button @click="ChangeMyPass()">Change</button>
        </div>
      </div>

      <div class="card">
        <button @click="change_pass = !change_pass.valueOf()">Change password</button>
        <div class="field-container">
          <!-- needs to be dynamic -->
          <p class="field" v-bind:class="{ red_text: keys.error }">{{ keys.text }}</p>
          <button class="red" @click="ResetKeys()">Reset keys</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss';
@use '@/assets/styles/main-ui.scss';
@use '@/assets/styles/profile.scss';
@use '@/assets/styles/form.scss';
@use '@/assets/styles/button.scss';
// OVERRIDE:
.red {
  background:
    variables.$simple-highlight,
    radial-gradient(100% 100% at 50% 100%, v-bind('red.color2') 0%, v-bind('red.color1') 100%);
}
.red_text {
  color: red;
}
</style>

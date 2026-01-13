<script setup lang="ts">
// import { CreateConversation } from '@/scripts/conversations'
import { SearchForUser } from '@/scripts/users'
import { reactive, ref } from 'vue'
import MemberList from './member-list.vue'

const form = reactive({
  query: '',
})

const result = ref({ error: '', content: '' })

async function submit() {
  result.value = await SearchForUser(form.query)
}
</script>
<template>
  <main class="form">
    <form @submit.prevent="submit()">
      <!-- fields -->
      <input type="text" v-model="form.query" placeholder="Username" required />
      <button @click="submit">Search</button>
    </form>
    <p v-if="result.error" class="error">{{ result.error }}</p>
    <MemberList
      @selected="
        (input) => {
          console.log(input)
        }
      "
      :user-array="result.content"
      char-limit="30"
      v-if="result.content"
    />
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss';
@use '@/assets/styles/main-ui.scss';
@use '@/assets/styles/form.scss';
@use '@/assets/styles/button.scss';

//OVERRIDES:
.form {
  padding-top: 0;
}

.effect-container {
  max-height: 50vh; //Ok css you win
}
</style>

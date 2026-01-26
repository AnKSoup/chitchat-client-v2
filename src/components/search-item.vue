<script setup lang="ts">
// import { CreateConversation } from '@/scripts/conversations'
import { SearchForUser } from '@/scripts/users'
import { reactive, ref } from 'vue'
import MemberList from './member-list.vue'

defineProps(['execute', 'button', 'hint'])

const form = reactive({
  query: '',
})

const result = ref({ error: '', content: '' })

async function submit() {
  const searchResult = await SearchForUser(form.query)
  if (searchResult.success) {
    result.value = searchResult.content
  } else {
    result.value = searchResult.error
  }
}
</script>
<template>
  <main class="form">
    <form @submit.prevent="submit()">
      <!-- fields -->
      <input type="text" v-model="form.query" placeholder="Username" required />
      <button @click="submit">{{ button }}</button>
    </form>
    <p v-if="result.error" class="error">{{ result.error }}</p>
    <div class="result-container" v-if="result.content">
      <p v-if="hint" class="hint">{{ hint }}</p>
      <MemberList
        @selected="
          (input) => {
            //Lets parent execute a function where the input is passed
            execute(input)
          }
        "
        :user-array="result.content"
        char-limit="30"
      />
    </div>
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

.result-container {
  display: flex;
  gap: variables.$desktop_spacing_big;
  height: 50vh; //ew
}

.effect-container {
  box-shadow: variables.$drop-box-shadow;
}
</style>

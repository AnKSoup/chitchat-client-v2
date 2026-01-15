<script setup lang="ts">
import { CreateConversation } from '@/scripts/conversations'
import { reactive, ref } from 'vue'

const emit = defineEmits(['new-conv'])

const form = reactive({
  conversation_name: '',
})

const result = ref('')

async function submit() {
  result.value = await CreateConversation(form.conversation_name)
  emit('new-conv')
}
</script>
<template>
  <main class="form">
    <form @submit.prevent="submit()">
      <!-- fields -->
      <input type="text" v-model="form.conversation_name" placeholder="Name" required />
      <input class="button" type="submit" value="Create Conversation" />
    </form>
    <p v-if="result" class="error">{{ result.valueOf() }}</p>
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/main-ui.scss';
@use '@/assets/styles/form.scss';
@use '@/assets/styles/button.scss';

//OVERRIDES:
</style>

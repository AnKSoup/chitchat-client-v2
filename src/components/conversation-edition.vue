<script setup lang="ts">
import { CreateConversation, EditConversation, GetConversationByID } from '@/scripts/conversations'
import { onMounted, reactive, ref } from 'vue'

const conversation = defineProps(['conversation_id'])
const emit = defineEmits(['edit-conv'])

onMounted(async () => {
  if (conversation.conversation_id) {
    const current_conversation = await GetConversationByID(conversation.conversation_id)
    form.conversation_name = current_conversation.conversation_name
  }
})

const form = reactive({
  // Add features as they are being added...
  conversation_name: '',
})

const result = ref('')

async function submit() {
  const edit = await EditConversation(conversation.conversation_id, form)
  if (!edit.success) {
    result.value = edit.detail
  } else {
    emit('edit-conv')
  }
}
</script>
<template>
  <main class="form">
    <form @submit.prevent="submit()">
      <!-- fields -->
      <input type="text" v-model="form.conversation_name" placeholder="Name" required />
      <input class="button" type="submit" value="Edit Conversation" />
    </form>
    <p v-if="result" class="error">{{ result.valueOf() }}</p>
  </main>
</template>

<style lang="scss">
@use '@/assets/styles/main-ui.scss';
@use '@/assets/styles/form.scss';
@use '@/assets/styles/button.scss';

//OVERRIDES:
</style>

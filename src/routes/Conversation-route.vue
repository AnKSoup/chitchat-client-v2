<script setup lang="ts">
import {
  addUserIcon,
  blogIcon,
  chatIcon,
  convSettingsIcon,
  createConvIcon,
  loginIcon,
  logoutIcon,
  profileIcon,
  remUserIcon,
  respondIcon,
  searchIcon,
} from '@/assets/objects/icons'
import iconList from '@/components/icon-list.vue'

import memberList from '@/components/member-list.vue'
import conversationList from '@/components/conversation-list.vue'
import writingBar from '@/components/writing-bar.vue'
import MessageList from '@/components/message-list.vue'
import { GetAllMembersOf, GetConversations } from '@/scripts/conversations'
import { onMounted, ref, watch } from 'vue'
import ConversationCreation from '@/components/conversation-creation.vue'
import { useRoute } from 'vue-router'
import { GetAllTheMessages, SendMessage } from '@/scripts/messages'

const conversation = defineProps(['conversation_id'])

const route = useRoute()

// To react to param changing
watch(
  () => route.params.conversation_id,
  () => {
    // react to route changes...
    LoadMembers()
    messageArray.value = [{ messages: [{ text: 'loading...' }] }]
    LoadMessages()
  },
)

const conversation_creation = ref(false)

function newConv() {
  // reset the ref
  conversation_creation.value = !conversation_creation.value
  // reload conversations
  LoadConversations()
}

function triggerError(message: string) {
  alert(message)
}

const conversationArray = ref([{ conversation_name: 'loading...' }])
const userArray = ref([{ user_name: 'loading...' }])
const messageArray = ref([{ messages: [{ text: 'loading...' }] }])

async function LoadConversations() {
  conversationArray.value = await GetConversations()
}

async function LoadMembers() {
  userArray.value = [{ user_name: 'loading...' }]
  userArray.value = await GetAllMembersOf(conversation.conversation_id)
}

async function LoadMessages() {
  await GetAllTheMessages(conversation.conversation_id, 20, messageArray.value)
}

// Get data on mounted
onMounted(async () => {
  LoadConversations()
  LoadMembers()
  LoadMessages()
})
</script>

<template>
  <!-- TODO: vif if logged in and if owner/ message selected -->
  <div class="ui-container">
    <!-- TOP hEADER -->
    <nav id="nav">
      <icon-list :icons-array="[[profileIcon, chatIcon, blogIcon]]" />
      <icon-list
        class="grow"
        :icons-array="[
          [
            searchIcon,
            {
              ...createConvIcon,
              ...{
                action: () => {
                  conversation_creation = !conversation_creation.valueOf() // ugly but works
                },
              },
            },
            convSettingsIcon,
            addUserIcon,
            remUserIcon,
            respondIcon,
          ],
          [loginIcon, logoutIcon],
        ]"
      />
    </nav>
    <ConversationCreation v-if="conversation_creation.valueOf()" @new-conv="newConv()" />
    <main v-if="!conversation_creation.valueOf()">
      <div class="fruity-border chatroom-list">
        <conversationList :conversation-array="conversationArray" />
      </div>
      <div class="conversation">
        <MessageList :messageList="messageArray" />
        <writing-bar
          @send="
            async (input) => {
              if (input.value) {
                const result = await SendMessage(conversation.conversation_id, input.value)
                if (result.success) {
                  // If it works refresh
                  input.value = ''
                  // Then refresh messages at the bottom here
                } else {
                  triggerError(result.detail)
                }
              }
            }
          "
          placeholder="Write something..."
        />
      </div>
      <div class="fruity-border user-list">
        <memberList :user-array="userArray" />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/main-ui.scss';
@use '@/assets/styles/conversation.scss';
@use '@/assets/styles/fruity-border.scss';

// OVERRIDE: because the height cannot get calculated properly
//main {
//  height: v-bind(finalHeight);
//}
</style>

<script setup lang="ts">
import {
  addUserIcon,
  blogIcon,
  chatIcon,
  convSettingsIcon,
  createConvIcon,
  leaveConvIcon,
  loginIcon,
  logoutIcon,
  profileIcon,
  remUserIcon,
  searchIcon,
} from '@/assets/objects/icons'
import iconList from '@/components/icon-list.vue'
import memberList from '@/components/member-list.vue'
import conversationList from '@/components/conversation-list.vue'
import writingBar from '@/components/writing-bar.vue'
import MessageList from '@/components/message-list.vue'
import {
  AddOtherMember,
  GetAllMembersOf,
  GetConversations,
  IsUserOwner,
  LeaveConversation,
} from '@/scripts/conversations'
import { onMounted, ref, watch } from 'vue'
import ConversationCreation from '@/components/conversation-creation.vue'
import { useRoute } from 'vue-router'
import { GetAllTheMessages, SendMessage } from '@/scripts/messages'
import SearchItem from '@/components/search-item.vue'
import ConversationEdition from '@/components/conversation-edition.vue'

const conversation = defineProps(['conversation_id'])
const route = useRoute()

//To switch between displayed elements
const display_element = ref('main')
function alternateElements(element: string) {
  if (display_element.value == element) {
    display_element.value = 'main'
  } else {
    display_element.value = element
  }
}

const ownerIconArray = ref([{}])
ownerIconArray.value.pop()

const leaveIcon = ref([{}])
leaveIcon.value.pop()

function PopulateOwnerArray(isOwner: boolean) {
  const ownerIcons = [
    {
      ...convSettingsIcon,
      ...{
        action: () => {
          alternateElements('edit_conv') // ugly but works
        },
      },
    },
    {
      ...addUserIcon,
      ...{
        action: () => {
          alternateElements('add_member') // ugly but works
        },
      },
    },
    remUserIcon,
  ]
  if (isOwner) {
    ownerIconArray.value = ownerIcons
  } else {
    ownerIconArray.value = []
  }
}

function PopulateLeaveIcon(conversation_id?: string) {
  if (conversation_id) {
    leaveIcon.value = [
      {
        ...leaveConvIcon,
        ...{
          action: () => {
            LeaveConversation(conversation.conversation_id)
          },
        },
      },
    ]
  } else leaveIcon.value = []
}

const conversationArray = ref([{ conversation_name: 'loading...' }])
const userArray = ref([{ user_name: 'loading...' }])
const messageArray = ref([{ messages: [{ text: 'loading...' }] }])

// To react to param changing
watch(
  () => route.params.conversation_id,
  async (newId) => {
    // react to route changes...
    if (!newId) {
      //This likely means a conversation just got left
      LoadConversations()
    }
    PopulateLeaveIcon(newId as string)
    PopulateOwnerArray(await IsUserOwner(newId as string))
    LoadMembers()
    messageArray.value = [{ messages: [{ text: 'loading...' }] }]
    LoadMessages()
  },
)

function triggerError(message: string) {
  alert(message)
}
//Lets the parent execute a function the child should execute but it lets me reuse the component so its a fair trade
function SearchExecute(input: number) {
  console.log(input) // works to use to add new members + add props to change name to add user instead of searching
}

async function AddMemberExecute(input: number) {
  const result = await AddOtherMember(conversation.conversation_id, input)
  if (result) {
    // Fails if not undefined
    alert(result)
  } else {
    fullReload()
  }
}

function newConv() {
  // reset the ref
  display_element.value = 'main'
  // reload conversations
  LoadConversations()
}

async function LoadConversations() {
  conversationArray.value = await GetConversations()
}

async function LoadMembers() {
  userArray.value = [{ user_name: 'loading...' }]
  userArray.value = await GetAllMembersOf(conversation.conversation_id)
}

async function LoadMessages() {
  messageArray.value = [{ messages: [{ text: 'loading...' }] }]
  await GetAllTheMessages(conversation.conversation_id, 20, messageArray.value)
}

function fullReload() {
  display_element.value = 'main'
  LoadConversations()
  LoadMembers()
  LoadMessages()
}

// Get data on mounted
onMounted(async () => {
  LoadConversations()
  if (conversation.conversation_id) {
    PopulateLeaveIcon(conversation.conversation_id)
    PopulateOwnerArray(await IsUserOwner(conversation.conversation_id))
    LoadMembers()
    LoadMessages()
  }
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
            {
              ...searchIcon,
              ...{
                action: () => {
                  alternateElements('search_for') // ugly but works
                },
              },
            },
            {
              ...createConvIcon,
              ...{
                action: () => {
                  alternateElements('create_conversation') // ugly but works
                },
              },
            },
            ...ownerIconArray,
            // respondIcon, //Not implemented yet
          ],
          [...leaveIcon, loginIcon, logoutIcon],
        ]"
      />
    </nav>

    <ConversationCreation
      v-if="display_element.valueOf() == 'create_conversation'"
      @new-conv="newConv()"
    />

    <ConversationEdition
      v-if="display_element.valueOf() == 'edit_conv'"
      :conversation_id="conversation.conversation_id"
      @edit-conv="newConv()"
    />

    <SearchItem
      :execute="SearchExecute"
      button="Search"
      v-if="display_element.valueOf() == 'search_for'"
    />

    <SearchItem
      :execute="AddMemberExecute"
      button="Search"
      hint="Click on a user to add them to the conversation."
      v-if="display_element.valueOf() == 'add_member'"
    />

    <main v-if="display_element.valueOf() == 'main'">
      <div class="fruity-border chatroom-list">
        <conversationList
          :conversation-array="conversationArray"
          :current_conversation="conversation.conversation_id"
        />
      </div>
      <div class="conversation" v-if="conversation.conversation_id">
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
      <div class="fruity-border user-list" v-if="conversation.conversation_id">
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

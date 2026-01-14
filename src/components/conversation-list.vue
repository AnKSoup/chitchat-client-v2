<script setup lang="ts">
import { stripText } from '@/scripts/text-operations'
import textBar from './text-bar.vue'
import router from '@/router'

function GoToConv(conversation_id: string) {
  router.push('/Conversations/' + conversation_id)
}

defineProps(['conversationArray', 'current_conversation'])
</script>

<template>
  <div class="effect-container">
    <div class="list-container">
      <div
        class="conversation-item"
        v-for="(item, index) in conversationArray"
        v-bind:key="item"
        :class="{ first: index === 0 }"
        @click="GoToConv(item.conversation_id)"
      >
        <text-bar
          :class="{ not_selected: current_conversation != item.conversation_id }"
          :text="stripText(22, item.conversation_name)"
          :image="item.image"
          :gradient-color1="item.gradientColor1"
          :gradient-color2="item.gradientColor2"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss';
@use '@/assets/styles/member-list.scss';

// OVERRIDE :
.list-container {
  align-items: end;
}
.conversation-item {
  div {
    transition: all ease-out 100ms;
    &:hover {
      cursor: pointer;
      transform: translate(0px, -5px);
      box-shadow: variables.$outer-glow;
    }
    height: variables.$desktop-pfp-size;
  }
}
</style>

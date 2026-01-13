<script setup lang="ts">
import MessageItem from './message-item.vue'

defineProps(['messageList'])
</script>

<template>
  <div class="message-list-container">
    <MessageItem
      v-for="item in messageList"
      v-bind:key="item"
      :messages="item.messages"
      :image="item.image"
      :orientation="item.orientation"
      :side="item.side"
      :gradient-color1="item.gradientColor1"
      :gradient-color2="item.gradientColor2"
      :id="item.id"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/message-list.scss';
// OVERRIDE:
</style>

<script setup lang="ts">
import { stripText } from '@/scripts/text-operations'
import textBar from './text-bar.vue'

defineProps(['conversationArray'])
</script>

<template>
  <div class="effect-container">
    <div class="list-container">
      <div
        class="conversation-item"
        v-for="(item, index) in conversationArray"
        v-bind:key="item"
        :class="{ first: index === 0 }"
      >
        <text-bar
          :text="stripText(16, item.name)"
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
    height: variables.$desktop-pfp-size;
  }
}
</style>

<script setup lang="ts">
import BubbleItem from './bubble-item.vue'
import ProfilePictureItem from './profile-picture-item.vue'

const message = defineProps([
  'messages',
  'image',
  'orientation',
  'side',
  'gradientColor1',
  'gradientColor2',
  'id',
])

const orientation = !message.orientation ? message.side : message.orientation
</script>

<template>
  <div class="message-container" v-bind:class="message.side == 'right' ? 'right' : ''">
    <!-- <p>{{ side }}</p> -->
    <ProfilePictureItem
      :image="image"
      :gradient-color1="gradientColor1"
      :gradient-color2="gradientColor2"
    />

    <!-- Iterates through every messages given in an array then applying the orientation only to the last element -->
    <div class="messages">
      <div v-for="(message, index) in messages" v-bind:key="index">
        <p class="time">{{ message.time }}</p>
        <BubbleItem
          :text="message.text"
          :gradient-color1="gradientColor1"
          :gradient-color2="gradientColor2"
          v-bind:orientation="index == messages.length - 1 ? orientation : ''"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// @use '@/assets/styles/variables.scss';
@use '@/assets/styles/message.scss';
// OVERRIDE:
</style>

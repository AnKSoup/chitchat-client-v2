<script setup lang="ts">
import { stripText } from '@/scripts/text-operations'
import ProfilePictureItem from './profile-picture-item.vue'
import BubbleItem from './bubble-item.vue'
import { generateGradient } from '@/scripts/gradients'
import { ref } from 'vue'

const comment = defineProps([
  'image',
  'username',
  'usernameResponse',
  'responsePreview',
  'date',
  'content',
  'gradientColor1',
  'gradientColor2',
  'gradientColor3',
  'gradientColor4',
  'id',
])
const gradient = ref(generateGradient(comment.gradientColor1, comment.gradientColor2))
const gradient2 = ref(generateGradient(comment.gradientColor3, comment.gradientColor4))
</script>

<template>
  <div class="horizontal">
    <ProfilePictureItem
      :image="image"
      :gradient-color1="gradientColor1"
      :gradient-color2="gradientColor2"
    />
    <div class="vertical">
      <div class="horizontal">
        <div class="vertical">
          <p class="username">{{ stripText(16, username) }}</p>
          <p class="date">{{ date }}</p>
        </div>
        <div class="vertical preview" v-if="usernameResponse && responsePreview">
          <p class="username-preview">↳{{ stripText(16, usernameResponse) }}</p>
          <p class="response-preview">{{ stripText(30, responsePreview) }}</p>
        </div>
      </div>
      <BubbleItem
        :text="content"
        :gradient-color1="gradientColor1"
        :gradient-color2="gradientColor2"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss';
@use '@/assets/styles/comment-item.scss';
// OVERRIDE:
.bubble-container {
  border-radius: 0 variables.$desktop-radius variables.$desktop-radius variables.$desktop-radius;
}

.username {
  background:
    variables.$simple-highlight,
    radial-gradient(
      100% 100% at 50% 100%,
      v-bind('gradient.color2') 0%,
      v-bind('gradient.color1') 100%
    );
  background-clip: text;
  color: transparent;
}

.username-preview {
  background:
    variables.$simple-highlight,
    radial-gradient(
      100% 100% at 50% 100%,
      v-bind('gradient2.color2') 0%,
      v-bind('gradient2.color1') 100%
    );
  background-clip: text;
  color: transparent;
}
</style>

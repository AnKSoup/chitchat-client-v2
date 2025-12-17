<script setup lang="ts">
import { generateGradient } from '@/scripts/gradients'
import { ref } from 'vue'

const bubble = defineProps(['text', 'orientation', 'gradientColor1', 'gradientColor2'])
const gradient = ref(generateGradient(bubble.gradientColor1, bubble.gradientColor2))

//Initialize the orientation given to the bubble
let orientation =
  bubble.orientation != 'left' && bubble.orientation != 'right' ? '' : bubble.orientation
</script>

<template>
  <div class="bubble-container" :class="orientation">
    <p>{{ text }}</p>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/bubble.scss';
@use '@/assets/styles/variables.scss';
// OVERRIDE:
.bubble-container {
  background:
    variables.$simple-highlight,
    radial-gradient(
      100% 100% at 50% 100%,
      v-bind('gradient.color2') 0%,
      v-bind('gradient.color1') 100%
    );
}
</style>

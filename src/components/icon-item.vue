<script setup lang="ts">
import { generateGradient } from '@/scripts/gradients'
import { ref } from 'vue'

// Get icon data called by the component parent:
const icon = defineProps(['iconImg', 'iconText', 'gradientColor1', 'gradientColor2', 'action'])

const gradient = ref(generateGradient(icon.gradientColor1, icon.gradientColor2))

const imagePath = '/images/' + icon.iconImg + '.svg'

function executeAction() {
  try {
    icon.action()
  } catch (error) {
    if (!icon.action) {
      console.log('Please provide an action for this button.')
    } else if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
</script>

<template>
  <div class="icon-container" @click="executeAction()">
    <img :src="imagePath" :alt="iconImg" />
    <div class="text-container">
      <p class="text">{{ iconText }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/icon.scss';
@use '@/assets/styles/variables.scss';
// OVERRIDE:
.icon-container {
  background:
    variables.$simple-highlight,
    radial-gradient(
      100% 100% at 50% 100%,
      v-bind('gradient.color2') 0%,
      v-bind('gradient.color1') 100%
    );
}

.text {
  // COLOR:
  background:
    variables.$simple-highlight,
    radial-gradient(
      100% 100% at 50% 100%,
      v-bind('gradient.color2') 0%,
      v-bind('gradient.color1') 100%
    );

  // Black magic to get the gradient as text color.
  background-clip: text;
  color: transparent;
}
</style>

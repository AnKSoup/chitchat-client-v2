<script setup lang="ts">
import { ref } from 'vue'

// Get icon data called by the component parent:
const icon = defineProps(['iconImg', 'iconText', 'gradientColor1', 'gradientColor2'])

let gradient = ref({
  color1: icon.gradientColor1,
  color2: icon.gradientColor2,
})

// Defaults to the blue gradient
if (!icon.gradientColor1 || !icon.gradientColor2) {
  gradient = ref({
    color1: '#4570ff',
    color2: '#35c2ff',
  })
}

const imagePath = 'src/assets/images/' + icon.iconImg + '.svg'
</script>

<template>
  <div class="icon-container">
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

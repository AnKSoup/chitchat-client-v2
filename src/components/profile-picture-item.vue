<script setup lang="ts">
import { generateGradient } from '@/scripts/gradients'
import { ref } from 'vue'

const pfp = defineProps(['image', 'gradientColor1', 'gradientColor2'])
const gradient = ref(generateGradient(pfp.gradientColor1, pfp.gradientColor2))
</script>
<template>
  <div class="image-container">
    <div class="image" v-bind:style="{ backgroundImage: `url(&quot;${image}&quot;)` }"></div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/profile-picture.scss';
@use '@/assets/styles/variables.scss';

div {
  background:
    variables.$simple-highlight,
    radial-gradient(
      100% 100% at 50% 100%,
      v-bind('gradient.color2') 0%,
      v-bind('gradient.color1') 100%
    );
}
</style>

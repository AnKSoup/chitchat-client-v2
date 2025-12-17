<script setup lang="ts">
import { generateGradient } from '@/scripts/gradients'
import { ref } from 'vue'

const bar = defineProps(['text', 'image', 'gradientColor1', 'gradientColor2'])
const gradient = ref(generateGradient(bar.gradientColor1, bar.gradientColor2))
</script>

<template>
  <div class="text-bar">
    <div v-bind:style="{ backgroundImage: `url(&quot;${image}&quot;)` }">
      <p v-bind:class="image ? 'text-outline' : 'no-text-outline'">{{ text }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/text-bar.scss';
@use '@/assets/styles/variables.scss';

// OVERRIDE:
.text-bar,
p {
  background:
    variables.$simple-highlight,
    radial-gradient(
      100% 100% at 50% 100%,
      v-bind('gradient.color2') 0%,
      v-bind('gradient.color1') 100%
    );
}
p {
  background-clip: text;
  color: transparent;
}
</style>

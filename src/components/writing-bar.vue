<script setup lang="ts">
import { generateGradient } from '@/scripts/gradients'
import { useTextareaAutosize } from '@vueuse/core'
import { ref } from 'vue'

const bar = defineProps(['placeholder', 'gradientColor1', 'gradientColor2'])
const gradient = ref(generateGradient(bar.gradientColor1, bar.gradientColor2))
const placeholder = bar.placeholder ? bar.placeholder : '...'

const { textarea, input } = useTextareaAutosize()
</script>
<template>
  <div class="bar-container">
    <div>
      <textarea ref="textarea" v-model="input" class="resize-none" :placeholder="placeholder" />
    </div>
    <button>SEND</button>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/button.scss';
@use '@/assets/styles/writing-bar.scss';
@use '@/assets/styles/variables.scss';

// OVERRIDE:
button,
.bar-container div {
  background:
    variables.$simple-highlight,
    radial-gradient(
      100% 100% at 50% 100%,
      v-bind('gradient.color2') 0%,
      v-bind('gradient.color1') 100%
    );
}
</style>

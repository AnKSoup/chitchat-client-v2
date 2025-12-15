<script setup lang="ts">
import icon from '@/components/icon-item.vue'

defineProps(['iconsArray'])
</script>

<template>
  <div class="fruity-border">
    <div class="list-container">
      <icon
        v-for="icon in iconsArray"
        v-bind:key="icon"
        :icon-img="icon.iconImg"
        :icon-text="icon.iconText"
        :gradient-color1="icon.gradientColor1"
        :gradient-color2="icon.gradientColor2"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/icon-list.scss';
@use '@/assets/styles/fruity-border.scss';
</style>

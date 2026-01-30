<script setup lang="ts">
import IconItem from './icon-item.vue'

defineProps(['iconsArray'])
</script>

<template>
  <div class="fruity-border">
    <div class="list-container">
      <div class="bundle" v-for="item in iconsArray" v-bind:key="item">
        <icon-item
          v-for="icon in item"
          v-bind:key="icon"
          :icon-img="icon.iconImg"
          :icon-text="icon.iconText"
          :gradient-color1="icon.gradientColor1"
          :gradient-color2="icon.gradientColor2"
          :action="icon.action"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/icon-list.scss';
@use '@/assets/styles/fruity-border.scss';
</style>

<script setup lang="ts">
// Get icon data called by the component parent:
const icon = defineProps(['iconName', 'iconText'])
const imagePath = 'src/assets/images/' + icon.iconName + '.svg'
</script>

<template>
  <div class="container">
    <img :src="imagePath" :alt="iconName" />
    <div class="text-container">
      <p class="text">{{ iconText }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('src/assets/styles/icon.scss');
</style>

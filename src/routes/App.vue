<script setup lang="ts">
import iconList from '@/components/icon-list.vue'
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <icon-list
    :icons-array="[
      { iconImg: 'chat', iconText: 'Chat' },
      { iconImg: 'blog', iconText: 'Blog' },
    ]"
  />

  <!-- <icon-list
    :icons-object="{
      '+ Conv.': 'create_conversation',
      '- User': 'remove_user',
      '+ User': 'add_user',
    }"
  /> -->
</template>

<style>
html {
  background-color: rgb(156, 156, 156);
}
</style>

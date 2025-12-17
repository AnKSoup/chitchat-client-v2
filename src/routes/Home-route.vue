<script setup lang="ts">
import buttonItem from '@/components/button-item.vue'
import profilePictureItem from '@/components/profile-picture-item.vue'
import writingBar from '@/components/writing-bar.vue'
</script>
<template>
  <h1>THIS IS THE UNFINISHED HOME PAGE</h1>
  <h2>WELCOME TO CHIT CHAT</h2>
  <div>
    <RouterLink to="Conversations">Go to Conversation</RouterLink>
  </div>
  <div>
    <RouterLink to="Blogs">Go to Blogs</RouterLink>
  </div>

  <div>test components</div>

  <button>TEST</button>

  <ul>
    <li>
      <profile-picture-item />
    </li>
    <li>
      <writing-bar />
    </li>
  </ul>
</template>

<style lang="scss">
@use '@/assets/styles/button.scss';
</style>

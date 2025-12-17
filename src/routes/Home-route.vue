<script setup lang="ts">
// import profilePictureItem from '@/components/profile-picture-item.vue'
import textBar from '@/components/text-bar.vue'
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

  <!-- <profile-picture-item /> -->
  <text-bar
    text="Test"
    image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc2.staticflickr.com%2F8%2F7067%2F6865167147_d35145533f_b.jpg"
  />
  <text-bar text="Test" />
</template>

<style lang="scss"></style>

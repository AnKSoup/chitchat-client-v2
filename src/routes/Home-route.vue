<script setup lang="ts">
import profilePictureItem from '@/components/profile-picture-item.vue'
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

  <profile-picture-item
    image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.8iw4doylAbh8GIV9FIrJEgHaE6%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=c0731549e233badcb371e1b93da142c8dd934aefabb04cdcc6632c3f5807f552&ipo=images"
  />
  <profile-picture-item
    image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Ff0%2F0c%2Fe8%2Ff00ce841a9c1175376f60ed115183718.jpg&f=1&nofb=1&ipt=1ab1c54f3ea41031c923341b39b055e47f308534ba51aaaafc65de7e0754f8a6"
    gradient-color1="red"
  />
  <profile-picture-item />
</template>

<style lang="scss"></style>

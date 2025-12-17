<script setup lang="ts">
import bubbleItem from '@/components/bubble-item.vue'
// import buttonItem from '@/components/button-item.vue'
// import profilePictureItem from '@/components/profile-picture-item.vue'
// import writingBar from '@/components/writing-bar.vue'
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

  <bubble-item text="test" orientation="left" gradient-color1="red" />
  <bubble-item text="test2" orientation="right" gradient-color1="yellow" />
  <bubble-item
    text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro molestiae nostrum amet dignissimos omnis aspernatur, dicta autem laudantium delectus molestias earum libero pariatur magni numquam, unde cumque optio? Nesciunt, perspiciatis!"
    gradient-color1="grey"
  />
  <ul>
    <!-- <li>
      <button-item />
    </li>
    <li>
      <profile-picture-item />
    </li>
    <li>
      <writing-bar />
    </li> -->
  </ul>
</template>

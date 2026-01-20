<script setup lang="ts">
import router from '@/router'
import { IsLoggedIn } from '@/scripts/users'
//Checks if the user is logged in already
IsLoggedIn()
</script>

<template>
  <div class="home">
    <div class="text-container">
      <h1>WELCOME TO CHIT CHAT</h1>
      <p>CHAT and BLOG securely with people all around the globe.</p>
    </div>

    <div class="button-container">
      <button @click="router.push('/Signin')">Join the nostalgia trip!</button>
      <button @click="router.push('/Login')">Start Chatting</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/home.scss';
@use '@/assets/styles/button.scss';
</style>

<script setup lang="ts">
import { IsLoggedIn } from '@/scripts/users'
//Checks if the user is logged in already
IsLoggedIn()
</script>

<template>
  <h1>THIS IS THE UNFINISHED HOME PAGE</h1>
  <h2>WELCOME TO CHIT CHAT</h2>
  <!-- Should check if user already connected with current user and if token valid -->
  <div>
    <RouterLink to="Signin">Go to Signin</RouterLink>
  </div>
  <div>
    <RouterLink to="Login">Go to Login</RouterLink>
  </div>

  <div>test components</div>
</template>

<style lang="scss" scoped></style>

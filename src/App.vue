<script setup lang="ts"></script>

<template>
  <!-- <Transition mode="out-in"> -->
  <!-- <KeepAlive> -->
  <!-- <Suspense> -->
  <RouterView />
  <!-- </Suspense> -->
  <!-- </KeepAlive>
  </Transition> -->
</template>

<style>
/* Normalizing Spacing */
@import 'normalize.css';

html {
  height: 100vh;
  background-size: cover;
  background-image: url('/images/background.jpg');
  /* for transparency */
  box-shadow: inset 100vh 100vw rgba(255, 255, 255, 0.5);
}

body,
#app {
  height: 100%;
}
</style>

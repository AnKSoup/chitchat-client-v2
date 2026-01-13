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
  background-color: rgb(156, 156, 156);
}

body,
#app {
  height: 100%;
}
</style>

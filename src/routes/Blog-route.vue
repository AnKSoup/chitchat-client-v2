<script setup lang="ts">
import {
  blogIcon,
  blogSettingsIcon,
  chatIcon,
  loginIcon,
  logoutIcon,
  profileIcon,
  respondIcon,
  searchIcon,
  signinIcon,
} from '@/assets/objects/icons'
import iconList from '@/components/icon-list.vue'
</script>

<template>
  <!-- TODO: vif if loged in and if owner/ message selected -->
  <div class="ui-container">
    <!-- TOP hEADER -->
    <nav>
      <icon-list :icons-array="[[profileIcon, chatIcon, blogIcon]]" />
      <icon-list
        :icons-array="[
          [searchIcon, blogSettingsIcon, respondIcon],
          [signinIcon, loginIcon, logoutIcon],
        ]"
      />
    </nav>
    <main>
      <div class="blog">test</div>
      <div class="comments">test</div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/main-ui.scss';
</style>

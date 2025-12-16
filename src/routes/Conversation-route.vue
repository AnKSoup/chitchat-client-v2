<script setup lang="ts">
import {
  addUserIcon,
  blogIcon,
  chatIcon,
  convSettingsIcon,
  createConvIcon,
  loginIcon,
  logoutIcon,
  profileIcon,
  remUserIcon,
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
          [searchIcon, createConvIcon, convSettingsIcon, addUserIcon, remUserIcon, respondIcon],
          [signinIcon, loginIcon, logoutIcon],
        ]"
      />
    </nav>
    <main>
      <div class="fruity-border chatroom-list">test</div>
      <div class="conversation">test</div>
      <div class="fruity-border user-list">test</div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/main-ui.scss';
@use '@/assets/styles/fruity-border.scss';
</style>

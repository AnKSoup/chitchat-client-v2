<script setup lang="ts">
import { stripText } from '@/scripts/text-operations'
import profilePictureItem from './profile-picture-item.vue'
import textBar from './text-bar.vue'
defineProps(['userArray'])

function SelectUser(user: object) {
  if ('user_id' in user) {
    console.log(user.user_id)
  }
}
</script>

<template>
  <div class="effect-container">
    <div class="list-container">
      <div
        class="bundle"
        v-for="(item, index) in userArray"
        v-bind:key="item"
        :class="{ first: index === 0 }"
        @click="SelectUser(item)"
      >
        <profile-picture-item
          :image="item.picture"
          :gradient-color1="item.gradientColor1"
          :gradient-color2="item.gradientColor2"
        />
        <text-bar
          :text="stripText(18, item.user_name)"
          :gradient-color1="item.gradientColor1"
          :gradient-color2="item.gradientColor2"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/member-list.scss';
</style>

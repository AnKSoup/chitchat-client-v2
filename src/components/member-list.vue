<script setup lang="ts">
import { stripText } from '@/scripts/text-operations'
import profilePictureItem from './profile-picture-item.vue'
import textBar from './text-bar.vue'
const props = defineProps(['userArray', 'charLimit'])
const emit = defineEmits(['selected'])

const limit_of_char = props.charLimit ? props.charLimit : 18

function SelectUser(user: object) {
  if ('user_id' in user) {
    emit('selected', user.user_id)
  }
  //would be better to pass in the id within an emitted event
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
          :text="stripText(limit_of_char, item.user_name)"
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

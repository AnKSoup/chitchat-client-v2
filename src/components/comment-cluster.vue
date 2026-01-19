<script setup lang="ts">
import CommentItem from './comment-item.vue'
defineProps(['comments', 'selected_comment'])

const emit = defineEmits(['selected'])
function SelectComment(comment: object) {
  if ('id' in comment) {
    emit('selected', comment.id)
  }
}
</script>

<template>
  <!-- comments + responses -->
  <div class="comment-cluster">
    <CommentItem
      v-for="(comment, index) in comments"
      v-bind:key="index"
      @click="SelectComment(comment)"
      :image="comment.image"
      :username="comment.username"
      :username-response="comment.usernameResponse"
      :response-preview="comment.responsePreview"
      :date="comment.date"
      :content="comment.content"
      :gradient-color1="comment.gradientColor1"
      :gradient-color2="comment.gradientColor2"
      :gradient-color3="comment.gradientColor3"
      :gradient-color4="comment.gradientColor4"
      :id="comment.id"
      :class="[index != 0 ? 'response' : '', { selected: selected_comment == comment.id }]"
    />
  </div>
</template>

<style lang="scss" scoped>
// @use '@/assets/styles/variables.scss';
@use '@/assets/styles/comment-cluster.scss';

// OVERRIDE:
</style>

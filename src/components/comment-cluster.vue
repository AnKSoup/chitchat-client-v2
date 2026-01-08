<script setup lang="ts">
import CommentItem from './comment-item.vue'
defineProps(['comments'])
</script>

<template>
  <!-- comments + responses -->
  <div class="comment-cluster">
    <CommentItem
      v-for="(comment, index) in comments"
      v-bind:key="index"
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
      v-bind:class="index != 0 ? 'response' : ''"
    />
  </div>
</template>

<style lang="scss" scoped>
// @use '@/assets/styles/variables.scss';
@use '@/assets/styles/comment-cluster.scss';

// OVERRIDE:
</style>

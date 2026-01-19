<script setup lang="ts">
import CommentCluster from './comment-cluster.vue'

defineProps(['commentClusters', 'selected_comment'])
const emit = defineEmits(['selected'])
function SelectComment(input: string) {
  emit('selected', input)
}
</script>

<template>
  <div class="comment-cluster-container">
    <CommentCluster
      v-for="clusters in commentClusters"
      v-bind:key="clusters[0]?.date"
      :comments="clusters"
      :selected_comment="selected_comment"
      @selected="SelectComment"
    />
  </div>
</template>

<style lang="scss" scoped>
// @use '@/assets/styles/variables.scss';
@use '@/assets/styles/comment-list.scss';
// OVERRIDE:
</style>

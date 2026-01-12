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
} from '@/assets/objects/icons'
import CommentList from '@/components/comment-list.vue'
import iconList from '@/components/icon-list.vue'
import profilePictureItem from '@/components/profile-picture-item.vue'
import TextBar from '@/components/text-bar.vue'
import WritingBar from '@/components/writing-bar.vue'

const author = {
  image:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FgEE2nFbVWG8%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=c5bce5cce999383ec862808d443d98dcdb70b057aa2cc16ec78dc6d327ce9c01',
  name: 'Jean',
  gradientColor1: 'blue',
  gradientColor2: '',
}

const commentClusters = [
  [
    {
      image: '',
      username: 'mister1',
      usernameResponse: '',
      responsePreview: '',
      date: '0000',
      content: 'je suis un commentaire',
      gradientColor1: 'blue',
      gradientColor2: '',
      gradientColor3: '',
      gradientColor4: '',
    },
    {
      image: '',
      username: 'mister2',
      usernameResponse: 'Mister1',
      responsePreview: 'je suis un commentaire',
      date: '0000',
      content: 'je suis un commentaire aussi',
      gradientColor1: '',
      gradientColor2: '',
      gradientColor3: 'blue',
      gradientColor4: '',
    },
    {
      image: '',
      username: 'mister2',
      usernameResponse: 'Mister1',
      responsePreview: 'je suis un commentaire',
      date: '0000',
      content: 'je suis un commentaire aussi',
      gradientColor1: '',
      gradientColor2: '',
      gradientColor3: 'blue',
      gradientColor4: '',
    },
  ],
  [
    {
      image: '',
      username: 'mister1',
      usernameResponse: '',
      responsePreview: '',
      date: '0000',
      content: 'je suis un commentaire',
      gradientColor1: 'blue',
      gradientColor2: '',
      gradientColor3: '',
      gradientColor4: '',
    },
  ],
  [
    {
      image: '',
      username: 'mister5',
      usernameResponse: '',
      responsePreview: '',
      date: '0000',
      content: 'je suis un commentaire',
      gradientColor1: 'blue',
      gradientColor2: '',
      gradientColor3: '',
      gradientColor4: '',
    },
  ],
]

const example = `<p style="color:red">I am some raw html</p>
<a href="https://www.youtube.com/">my site</a>
<a href="https://www.youtube.com/" target="_blank">my site2</a>`
</script>

<template>
  <!-- TODO: vif if logged in and if owner/ message selected -->
  <div class="ui-container">
    <!-- TOP hEADER -->
    <nav>
      <icon-list :icons-array="[[profileIcon, chatIcon, blogIcon]]" />
      <icon-list
        class="grow"
        :icons-array="[
          [searchIcon, blogSettingsIcon, respondIcon],
          [loginIcon, logoutIcon],
        ]"
      />
    </nav>
    <main>
      <iframe class="blog" :srcdoc="example" sandbox="" frameborder="0"></iframe>
      <div class="comments">
        <div class="author">
          <profile-picture-item
            :image="author.image"
            :gradient-color1="author.gradientColor1"
            :gradient-color2="author.gradientColor2"
          />
          <text-bar
            :text="author.name"
            :gradient-color1="author.gradientColor1"
            :gradient-color2="author.gradientColor2"
          />
        </div>
        <comment-list :comment-clusters="commentClusters" />
        <writing-bar
          placeholder="Comment something..."
          :gradient-color1="author.gradientColor1"
          :gradient-color2="author.gradientColor2"
        />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/main-ui.scss';
@use '@/assets/styles/blog.scss';
</style>

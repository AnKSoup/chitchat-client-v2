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

import memberList from '@/components/member-list.vue'
import conversationList from '@/components/conversation-list.vue'
import writingBar from '@/components/writing-bar.vue'
import MessageList from '@/components/message-list.vue'
// import { ref, onMounted, onBeforeUnmount } from 'vue'

const userTests = [
  {
    name: 'jean',
    picture:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.KQLtvicVWgm_l6GZPLblHwHaNK%3Fpid%3DApi&f=1&ipt=adaa8c2894d714413ce160f6adaee5a69141b88ee4129699f723e8062426e5e3&ipo=images',
    gradientColor1: 'blue',
    gradientColor2: '',
  },
  {
    name: 'sdfjkhjhfgjshdghjghjsdhgjhgsfjhgjfhsgjgfs',
    picture:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.6oGFxDsrWU6fOpfb1XFVegHaF5%3Fpid%3DApi&f=1&ipt=34db279149c39c84b673559125d27617d37aa9b2ae25240d1e40f01980417e97&ipo=images',
    gradientColor1: 'blue',
    gradientColor2: 'green',
  },
]

const conversationTest = [
  {
    name: 'ELOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOooo',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.KQLtvicVWgm_l6GZPLblHwHaNK%3Fpid%3DApi&f=1&ipt=adaa8c2894d714413ce160f6adaee5a69141b88ee4129699f723e8062426e5e3&ipo=images',
    gradientColor1: 'blue',
    gradientColor2: '',
  },
  {
    name: 'hi',
    gradientColor1: 'blue',
    gradientColor2: 'red',
  },
  { name: 'aaa' },
  { name: 'aaa' },
  { name: 'aaa' },
  { name: 'aaa' },
  { name: 'aaa' },
  { name: 'aaa' },
  { name: 'aaa' },
  { name: 'aaa' },
  { name: 'aaa' },
  { name: 'aaa' },
  { name: 'aaa' },
  { name: 'aaa' },
  { name: 'aaa' },
  { name: 'aaa' },
  { name: 'aaa' },
]

//Yoinked from the net but it works (I hate css)

//let nav: HTMLElement

// let windowHeight = 0
// let navHeight = 0
// const gapHeight = 15
// const finalHeight = ref('85')

//Updating stuff
// const handleResize = () => {
//  windowHeight = window.innerHeight
//  navHeight = parseInt(getComputedStyle(nav).height)
//
//  const result = windowHeight - navHeight - gapHeight * 4
//
//  finalHeight.value = `${result}px`
//}

//Initialization on load
//window.onload = () => {
//  const test = document.getElementById('nav')
//  if (test) {
//    nav = test
// }
//  handleResize()
//}

//onMounted(() => {
//  window.addEventListener('resize', handleResize)
//})

//onBeforeUnmount(() => {
//  window.removeEventListener('resize', handleResize)
//})

const messageList = [
  {
    messages: [
      { text: 'hi', time: '000000' },
      { text: 'hi', time: '000001' },
    ],
    image: '',
    orientation: '',
    side: 'left',
    gradientColor1: 'blue',
    gradientColor2: '',
  },
  {
    messages: [
      { text: 'NNOOOOOOO', time: '000000' },
      { text: 'NNOOOOOOO', time: '000000' },
      { text: 'NNOOOOOOO', time: '000000' },
    ],
    image: '',
    orientation: '',
    side: 'right',
    gradientColor1: 'red',
    gradientColor2: '',
  },
  {
    messages: [
      { text: 'hi', time: '000000' },
      { text: 'hi', time: '000001' },
      { text: 'hi', time: '000001' },
      { text: 'hi', time: '000001' },
      { text: 'hi', time: '000001' },
      { text: 'hi', time: '000001' },
      { text: 'hi', time: '000001' },
      { text: 'hi', time: '000001' },
      { text: 'hi', time: '000001' },
      { text: 'hi', time: '000001' },
      { text: 'hi', time: '000001' },
      { text: 'hi', time: '000001' },
      { text: 'hi', time: '000001' },
    ],
    image: '',
    orientation: '',
    side: 'left',
    gradientColor1: 'blue',
    gradientColor2: '',
  },
]
</script>

<template>
  <!-- TODO: vif if logged in and if owner/ message selected -->
  <div class="ui-container">
    <!-- TOP hEADER -->
    <nav id="nav">
      <icon-list :icons-array="[[profileIcon, chatIcon, blogIcon]]" />
      <icon-list
        :icons-array="[
          [searchIcon, createConvIcon, convSettingsIcon, addUserIcon, remUserIcon, respondIcon],
          [signinIcon, loginIcon, logoutIcon],
        ]"
      />
    </nav>
    <main>
      <div class="fruity-border chatroom-list">
        <conversationList :conversation-array="conversationTest" />
      </div>
      <div class="conversation">
        <MessageList :messageList="messageList" />
        <writing-bar placeholder="Write something..." gradient-color1="red" />
      </div>
      <div class="fruity-border user-list">
        <memberList :user-array="userTests" />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/main-ui.scss';
@use '@/assets/styles/conversation.scss';
@use '@/assets/styles/fruity-border.scss';

// OVERRIDE: because the height cannot get calculated properly
//main {
//  height: v-bind(finalHeight);
//}
</style>
